<script setup>
import google from '@/assets/icons/google.svg'

import { authController } from '~/services/modules/auth'

const emit = defineEmits(['registerEvent'])

const props = defineProps({
  accountType: String,
})
// Get countries Dial code
const countryCode = [{
  name: 'Nigeria',
  code: 'NG',
  dial_code: '+234',
},
]

// Updates sign up title
const router = useRouter()
const worker = ref(true)

onMounted(() => {
  if (router.currentRoute.name === 'getstarted') {
    worker.value = false
  }
})

// TODO: Move this to Helper or composable

// Handle password visibility
const password1Type = ref('password')
const password2Type = ref('password')

const handlePasswordVisible = (eventData) => {
  if (eventData.visibility) {
    if (eventData.id === 'password1') password1Type.value = 'text'
    if (eventData.id === 'password2') password2Type.value = 'text'
  }
  else {
    password1Type.value = 'password'
    password2Type.value = 'password'
  }
}

// TODO:  Check for password match, check for empty fields

// Handle registration api
const { createUser } = authController()
const loading = ref(false)
const userData = reactive({
  first_name: '',
  last_name: '',
  email: '',
  country_code: '',
  phone: '',
  password: '',
  password_confirmation: '',
  account_type: props?.accountType,
})

// Check for password mach
const passwordMatch = ref(true)
const emailCookies = useCookie('email', {
  maxAge: 60 * 60 * 24,
})

const register = async () => {
  loading.value = true
  // emit('registerEvent')
  try {
    const { data, error, status } = await createUser(userData)
    if (status.value === 'success') {

      handleALert(status.value, data.value.message)
      // save Email to cookies
      emailCookies.value = userData.email
      // The Employer /Client Registration Flow
      if (userData.account_type === 'employer') {
        await navigateTo('/verifyOtp')
      }
      else {
        emit('registerEvent')
      }
    }
    if (status.value === 'error') {
      handleALert(status.value, error.value.data.message)
    }
  }
  catch (error) {
    handleError(error)
  }
  finally {
    loading.value = false
  }
}
// emit signup event
const signUp = () => {
  if (userData.password.trim() === userData.password_confirmation.trim()) {
    register()
  }
  else {
    passwordMatch.value = false
  }
}
</script>

<template>
  <div class="">
    <div class="mb-9 ">
      <h1 class="text-2xl lg:text-3xl font-bold text-[rgba(35, 35, 35, 1)] mb-2 text-center lg:text-left">
        {{ props.accountType === 'employer' ? 'Client Sign Up':'Worker Sign Up' }}
      </h1>
      <p class="text-lg text-[rgba(106, 106, 106, 1)] text-center lg:text-left">
        Sign up to find the best Man For The Job
      </p>
    </div>
    <form @submit.prevent="signUp" class="w-full">
      <div class="flex flex-col sm:flex-row justify-center items-center gap-2 mb-5">
        <BaseInput
          v-model="userData.first_name"
          label="First Name"
          type="text"
          placeholder="John"
          class="w-full mb-5"

          :required="true"
        />
        <BaseInput
          v-model="userData.last_name"
          label="Last Name"
          type="text"
          placeholder="Doe"
          class="w-full mb-5"

          :required="true"
        />
      </div>
      <BaseInput
        v-model="userData.email"
        label="Email"
        type="email"
        placeholder="Johndoe@email.com"
        class="w-full mb-5"
        :required="true"
      />
      <div class="flex flex-col sm:flex-row justify-center items-center gap-2 mb-5">
        <BaseInput
          v-model="userData.country_code"
          label="Country Code"
          type="select"
          :data="countryCode"
          class="w-full mb-5"
          :required="true"
        />
        <BaseInput
          v-model="userData.phone"
          label="Phone Number"
          type="tel"
          placeholder="08123487678"
          class="w-full mb-5"

          :required="true"
        />
      </div>
      <div class="gap-2 mb-5">
        <div class="flex flex-col sm:flex-row justify-center items-center gap-2 mb-5">
          <BaseInput
            v-model="userData.password"
            label="Password"
            :type="password1Type"
            :icon="true"
            icon-type="password"
            :instance-id="'password1'"
            class="w-full mb-5"

            :required="true"
            @password-visible="handlePasswordVisible"
          />
          <BaseInput
            v-model="userData.password_confirmation"
            label="Confirm Password"
            :type="password2Type"
            :icon="true"
            icon-type="password"
            :instance-id="'password2'"
            class="w-full mb-5"

            :required="true"
            @password-visible="handlePasswordVisible"
          />
        </div>
        <p
          v-if="!passwordMatch"
          class="mt-2 text-pink-600 text-sm"
        >
          Password does not match
        </p>
      </div>

      <BaseButton
        title="Sign Up"
        color="#8B6914"
        text-color="rgba(255, 255, 255, 1)"
        :outline="false"
        :loading="loading"
        class="block w-full mb-5"
        type="submit"
      />
      <div class="divider mb-5">
        OR
      </div>
      <div>
        <BaseButton
          title="Sign up with Google"
          color="rgba(255, 255, 255, 1)"
          text-color="rgba(35, 35, 35, 1)"
          border="rgba(230, 232, 231, 1)"
          :outline="true"
          alt="google"
          :src="google"
          class=" w-full mb-5"
        />
      </div>
    </form>

    <p class="text-lg font-semibold text-center">
      Already Have account? <NuxtLink
        to="/login"
        class=" text-darkGold"
      >
        Login
      </NuxtLink>
    </p>
  </div>
</template>
