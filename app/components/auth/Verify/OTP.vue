<script setup>
import { authController } from '~/services/modules/auth'

import { useGlobalStore } from '~/store'

const store = useGlobalStore()

const emits = defineEmits(['nextEvent', 'prevEvent'])

const userEmail = useCookie('email')

const buttonOption = ref('Verify')
const loading = ref(false)
const accountType = ref(inject('SignUpType')) ?? 'worker'

const maskedEmail = computed(() => {
  if (userEmail.value && userEmail.value.includes('@')) {
    const [local, domain] = userEmail.value.split('@')
    const firstThree = local.slice(0, 3)
    const starredLocal = `${firstThree}${'*'.repeat(local.length - 3)}`
    return `${starredLocal}@${domain}`
  }
  else {
    return null
  }
})

// OTP
const { verifyOtp, Resend } = authController()

// retrieve email data from localStorage
const OTPData = reactive({
  email: userEmail.value ?? null,
  code: '',
})
const tokenCookies = useCookie('token', {
  maxAge: 60 * 60 * 24,
  // secure: true,
})

const verifyOTP = async () => {
  if (OTPData.email) {
    loading.value = true // Set loading to true before making the request
    try {
      const { data, error, status } = await verifyOtp(OTPData)
      if (status.value === 'success') {
        buttonOption.value = 'Next'

        tokenCookies.value = {
          token: data.value.data.token,
          type: 'User',
        }
        store.UserAccount = data.value.data.user
        handleALert('success', data.value.message)
      }
      else {
        handleALert('error', error.value.data.message)
      }
    }
    catch (error) {
      handleError(error)
    }
    finally {
      loading.value = false // Ensure loading is set to false after request
    }
  }
  else {
    handleALert('error', 'No Email Found')
  }
}

const emitEvent = async (event) => {
  switch (event) {
    case 'Verify':
      verifyOTP()
      break
    case 'Next':
      emits('nextEvent')
      break
    case 'worker':
      emits('prevEvent')
      break
    case 'employer':
      await navigateTo('/getstarted')
      break
    default:
      break
  }
}

const resendOTP = async () => {
  if (userEmail.value) {
    try {
      const { status, data, error } = await Resend({ email: userEmail.value })
      if (data) console.log(data.value)
      if (status.value === 'success') {
        handleALert('success', 'Verification Sent')
      }
      else {
        handleALert('error', error.value.data.message)
      }
    }
    catch (error) {
      handleError(error)
    }
  }
  else {
    handleALert('error', 'No Email Found')
  }
}
</script>

<template>
  <div class="card shadow-xl bg-white">
    <div class="card-body">
      <h2 class="card-title text-[rgba(35, 35, 35, 1)] font-bold text-3xl">
        Verify OTP
      </h2>
      <p class="text-[rgba(106, 106, 106, 1)] text-lg mb-5">
        <span v-if="maskedEmail"> Input one time password sent to {{ maskedEmail }} To Continue?</span>
        <span
          v-else
          class="text-red-500"
        >No Email Found, try registration with a new email</span>
      </p>
      <BaseInput
        v-model="OTPData.code"
        type="text"
        label="OTP"
        placeholder="placeholder"
        class="mb-5"
      />
      <p class="text-[rgba(30, 30, 30, 1)] text-center mb-5">
        Didn’t receive any password?
      </p>
      <a
        href="javascript:void(0)"
        class="text-darkGold text-center"
        @click="resendOTP"
      >
        Resend OTP
      </a>
      <div class="card-actions justify-between">
        <BaseButton
          title="Back"
          color="rgba(255, 255, 255, 1)"
          text-color="#8B6914"
          border="#8B6914"
          :outline="true"
          class="block mb-5 w-[20%]"
          @click="emitEvent(accountType)"
        />
        <BaseButton
          :title="buttonOption"
          :loading="loading"
          color="rgba(33, 31, 31, 1)"
          text-color="rgba(255, 255, 255, 1)"
          border="#8B6914"
          :outline="false"
          class="block mb-5 w-[20%]"
          @click="emitEvent(buttonOption)"
        />
      </div>
    </div>
  </div>
</template>
