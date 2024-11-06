<script setup>
const emits = defineEmits(['continueProfileSetup'])

const setup = ref(null)
onMounted(() => {
  closeModal(setup)
})

// Navigate to the plaform
const toPlatform = async () => {
  closeModal(closeMdal)
  await navigateTo('/home')
}

const continueProfile = ref(false)
// close the modal
const closeMdal = ref(null)
// to profile setup process
const toProfileSetup = () => {
  continueProfile.value = activeSetupProcess.value
  emits('continueProfileSetup')
  closeModal(closeMdal)
}

const activeSetupProcess = ref(1)

const buttonOption = ref('Next')

const nextProcess = (step, type = 'next') => {
  Next(type)
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
  <div class="w-2/5">
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
          <AuthProfileSetUpBPDetails v-if="activeSetupProcess === 1" />
          <MarketPlaceEmployerAddListingThree
            v-if="activeSetupProcess === 2"
            class="justify-center"
          />
          <AuthProfileSetUpAddGigs v-if="activeSetupProcess === 3" />

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
