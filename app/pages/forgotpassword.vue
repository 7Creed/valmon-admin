<script setup>
import { authController } from '~/services/modules/auth'

const { forgotPassword } = authController()

definePageMeta({
  layout: false,
})
const userEmail = useCookie('email')

const email = ref('')
const loading = ref(false)

const retrievePassword = async () => {
  loading.value = true
  try {
    const { data, error, status } = await forgotPassword({ email: email.value })
    if (status.value === 'success') {
      handleALert(status.value, data.value.message)
      userEmail.value = email.value
      await navigateTo('/resetpassword')
    }
    if (status.value === 'error') {
      handleALert(status.value, error.value.data?.message)
    }
  }
  catch (error) {
    handleError(error)
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class=" p-6 lg:p-12 bg-white min-h-screen center">
    <div class="w-full md:w-1/2 xxl:w-1/3 mx-auto">
      <div class="card shadow-xl bg-white">
        <div class="card-body">
          <h2 class="card-title text-[rgba(35, 35, 35, 1)] font-bold text-2xl lg:text-3xl justify-center lg:justify-start">
            Forgot Password
          </h2>
          <p class="text-[rgba(106, 106, 106, 1)] text-lg mb-5 text-center lg:text-left">
            Input your email address to continue
          </p>
          <form @submit.prevent="retrievePassword">
            <BaseInput
              v-model="email"
              type="email"
              label="Email"
              placeholder="placeholder"
              class="mb-5"
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
                class="block mb-5 w-full lg:w-[20%]"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
