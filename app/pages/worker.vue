<script setup>
import Logo from '@/assets/images/Logo/valmon.svg'
import ClientSignUp from '@/components/auth/Registration/ClientSignUp.vue'
import ServiceCategory from '@/components/auth/Registration/ServiceCategory.vue'
import PrimaryCategory from '@/components/auth/Registration/PrimaryCategory.vue'
import WorkingHours from '@/components/auth/Registration/WorkingHours.vue'
import UploadPicture from '@/components/auth/Verify/UploadPicture.vue'

definePageMeta({
  layout: false,
})

const stepsdata = [
  { name: 'Basic info', id: 1 },
  { name: 'Verify OTP', id: 2 },
  { name: 'Address', id: 3 },
  { name: 'Service Category', id: 4 },
  { name: 'Primary Category', id: 5 },
  { name: 'Working Hours', id: 6 },
  { name: 'Profile Picture', id: 7 },

]
const step = ref(6)

// Handle profile setup
const profileSetup = ref('')

const increaseStep = () => {
  if (step.value < 8) {
    step.value++
  }
}
const decreaseStep = () => {
  console.log('works')
  if (step.value > 1) {
    step.value--
  }
}
const isCategoryData = ref(null)
const sendToPrimaryCategory = (data) => {
  console.log('service data ->', data)
  isCategoryData.value = data
  increaseStep()
}
const setupProfile = () => {
  step.value = 0
  profileSetup.value = 'setup'
}
</script>

<template>
  <div class="p-3 lg:p-12 bg-white min-h-screen">
    <div
      to="/"
      class="flex gap-10"
    >
      <NuxtLink
        to="/"
        class="hidden lg:block"
      >
        <img
          :src="Logo"
          alt="Valmon logo"
          class="w-20"
        >
      </NuxtLink>
      <ul
        v-if="step > 0 || profileSetup === 'setup'"
        class="hidden lg:inline-grid steps steps-vertical lg:steps-horizontal  flex-grow"
      >
        <li
          v-for="(steps) in stepsdata"
          :key="steps.id"
          :class="['step', steps.id <= step ? 'step-neutral' : '']"
        >
          {{ steps.name }}
        </li>
      </ul>
    </div>

    <progress
      class="lg:hidden mb-5 mt-6 progress "
      :value="step"
      max="7"
    />

    <div class="lg:min-h-screen flex justify-center lg:items-center mt-6">
      <div
        v-if="step === 1"
        class="card bg-base-100 shadow-xl w-full lg:w-1/2 xxl:w-1/3"
      >
        <div class="card-body">
          <ClientSignUp
            account-type="worker"
            @register-event="increaseStep"
          />
        </div>
      </div>
      <div />
      <!-- OTP -->
      <authVerify
        v-if="step === 2"
        class="w-1/2 xxl:w-1/3"
        @next-event="increaseStep"
        @prev-event="decreaseStep"
      />
      <!-- Address -->
      <authRegistrationAddress
        v-if="step === 3"
        class="w-full md:w-1/2 xl:w-1/3"

        @next-event="increaseStep"
        @prev-event="decreaseStep"
      />
      <ServiceCategory
        v-if="step === 4"
        use-type="registration"
        class="w-full sm:w-4/5 xl:w-1/3"
        @next-event="sendToPrimaryCategory"
        @prev-event="decreaseStep"
      />
      <PrimaryCategory
        v-if="step === 5"
        class="w-full sm:w-4/5 xl:w-1/3"
        :service-data="isCategoryData"
        @next-event="increaseStep"
        @prev-event="decreaseStep"
      />
      <WorkingHours
        v-if="step === 6"
        use-type="registration"
        class="w-full sm:w-4/5 xl:w-1/3"
        @next-event="increaseStep"
        @prev-event="decreaseStep"
      />
      <UploadPicture
        v-if="step === 7 "
        class="w-full sm:w-4/5 xl:w-1/3"
        @next-event="increaseStep"
        @prev-event="decreaseStep"
        @setup-process="setupProfile"
      />
      <AuthProfileSetUp
        v-if="profileSetup"
        class="w-1/2 xl:w-1/3"
        @continue-profile-setup="profileSetup = 'onProcess'"
      />
    </div>
  </div>
</template>
