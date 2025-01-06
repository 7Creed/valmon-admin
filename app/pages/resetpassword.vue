<script setup>
import { authController } from '~/services/modules/auth'

definePageMeta({
  layout: false,
})
const { resetPassword } = authController()

const loading = ref(false)

const email = useCookie('email')

const userData = reactive({
  email: email.value ?? null,
  token: '',
  password: '',
  password_confirmation: '',
})

const retrievePassword = async () => {
  if (userData.email) {
    loading.value = true // Set loading to true before making the request

    try {
      const { data, error, status } = await resetPassword(userData)
      if (status.value === 'success') {
        handleALert('success', data.value.message)
        await navigateTo('/login')
      }
      if (status.value === 'error') {
        handleALert('error', error.value.data.message)
      }
    }
    catch (error) {
      handleError(error)
    }
    finally {
      loading.value = false
    }
  }
  else {
    handleError('error', 'Something went wrong')
  }
}
</script>

<template>
  <div class="p-12 bg-white min-h-screen center">
    <div class="w-1/2 xxl:w-1/3 mx-auto">
      <div class="card shadow-xl bg-white">
        <div class="card-body">
          <h2 class="card-title text-[rgba(35, 35, 35, 1)] font-bold text-3xl mb-5">
            Rest Password
          </h2>
          <form @submit.prevent="retrievePassword">
            <BaseInput
              v-model.trim="userData.token"
              type="text"
              label="OTP"
              placeholder="placeholder"
              class="mb-5"
            />
            <BaseInput
              v-model="userData.password"
              label="New Password"
              type="password"
              :icon="true"
              icon-type="password"
              class="mb-3"
              :required="true"
            />
            <BaseInput
              v-model="userData.password_confirmation"
              label="Confirm Password"
              type="password"
              :icon="true"
              icon-type="password"
              class="mb-3"
              :required="true"
            />
            <div class="card-actions justify-between">
              <BaseButton
                title="Confirm"
                :loading="loading"
                color="rgba(33, 31, 31, 1)"
                text-color="rgba(255, 255, 255, 1)"
                border="#8B6914"
                :outline="false"
                type="submit"
                class="block mb-5 w-[20%]"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
