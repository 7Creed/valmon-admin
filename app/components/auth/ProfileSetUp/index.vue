<script setup>
import { accountController } from '~/services/modules/account'

const emits = defineEmits(['continueProfileSetup'])

const { UpdateProfile, addGallery } = accountController()

const setup = ref(null)

onMounted(() => {
  closeModal(setup)
})

// Navigate to the plaform
const toPlatform = () => {
  closeModal(closeMdal)
  reloadNuxtApp({
    force: true,
    path: '/home',
  })
}
const activeSetupProcess = ref(1)

const buttonOption = ref('Next')

const continueProfile = ref(false)
const hideNextBtn = ref(true)
// close the modal
const closeMdal = ref(null)
const enableNextBtn = () => {
  hideNextBtn.value = false
}
// to profile setup process
const toProfileSetup = () => {
  continueProfile.value = activeSetupProcess.value
  emits('continueProfileSetup')
  closeModal(closeMdal)
}

// Handles Basic Profiles
const loading = ref(false)
const handleBasicProfile = async (func, UserData) => {
  loading.value = true
  const { status, error } = await func(UserData)
  if (status.value === 'success') {
    loading.value = false
    Next('next')
  }
  if (status.value === 'error') {
    handleError('error', error.value.data.message)
    loading.value = false
  }
}

const BasicDetails = ref(null)

const handleBasicDetails = (eventData) => {
  BasicDetails.value = eventData
}

const nextProcess = (step) => {
  if (step === 1) {
    // Bio
    handleBasicProfile(UpdateProfile, BasicDetails.value)
  }
  if (step === 2) {
    // Gallery
    const formData = new FormData()
    BasicDetails.value.forEach((image) => {
      formData.append('images[]', image)
    })

    handleBasicProfile(addGallery, formData)
  }
  if (step === 3) {
    // Gig
    Next('next')
  }
}
const Next = (param) => {
  if (param === 'next' && activeSetupProcess.value < 5) {
    activeSetupProcess.value++
  }
  if (param === 'back' && activeSetupProcess.value > 1) {
    activeSetupProcess.value--
  }
}
</script>

<template>
  <div class="">
    <div
      ref="setup"
      onclick="my_modal_2.showModal()"
    />
    <div v-if="continueProfile && activeSetupProcess !== 4">
      <div class="card bg-base-100 w-full shadow-xl">
        <div class="card-body">
          <a
            href="javascript:void(0)"
            class="ms-auto"
            @click="Next('next')"
          >skip</a>
          <!-- Components -->
          <AuthProfileSetUpBPDetails
            v-if="activeSetupProcess === 1"
            @basic-profile="handleBasicDetails($event)"
          />
          <MarketPlaceEmployerAddListingThree
            v-if="activeSetupProcess === 2"
            class="justify-center"
            type="BasicProfileSetup"
            @basic-profile="handleBasicDetails($event)"
          />
          <AuthProfileSetUpAddGigs
            v-if="activeSetupProcess === 3"
            @basic-profile="enableNextBtn"
          />

          <div class="card-actions justify-between mt-3">
            <BaseButton
              v-if="activeSetupProcess > 1"
              title="Back "
              color="rgba(255, 255, 255, 1)"
              text-color="rgb(139, 105, 20)"
              :outline="true"
              :border="'#8B6914'"
              class="block w-[20%] mb-5"
              @click="Next('back')"
            />
            <BaseButton
              :loading="loading"
              :disabled="hideNextBtn && activeSetupProcess === 3"
              :title="buttonOption"
              color="rgba(33, 31, 31, 1)"
              text-color="rgba(255, 255, 255, 1)"
              border="#8B6914"
              :outline="false"
              class="block mb-5 w-[20%] ms-auto"
              @click="nextProcess(activeSetupProcess)"
            />
          </div>
        </div>
      </div>
    </div>
    <AuthProfileSetUpAccountComplete v-if="activeSetupProcess === 4" />
  </div>

  <dialog
    id="my_modal_2"
    class="modal"
  >
    <div class="modal-box">
      <h3 class="text-2xl font-bold mb-4 text-[rgba(30, 30, 30, 1)]">
        Do You Want To Setup Your Profile Now
      </h3>
      <p class="text-[#6A6A6A] text-base mb-5">
        Profile setup would take up to 10 Minutes
      </p>

      <BaseButton
        title="Yes, Setup Profile Now"
        color="rgba(33, 31, 31, 1)"
        text-color="rgba(255, 255, 255, 1)"
        :outline="false"
        class="block w-full mb-5"
        @click="toProfileSetup"
      />
      <BaseButton
        title="No, Jump right into the platform "
        color="rgba(255, 255, 255, 1)"
        text-color="rgb(139, 105, 20)"
        :outline="true"
        :border="'#8B6914'"
        class="block w-full mb-5"
        @click="toPlatform"
      />
      <div class="modal-action h-0">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button ref="closeMdal" />
        </form>
      </div>
    </div>
  </dialog>
</template>
