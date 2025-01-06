<script setup>
import { authController } from '~/services/modules/auth'

const { ResetPassword } = authController()

const userData = reactive({
  old_password: '',
  new_password: '',
  new_password_confirmation: '',

})

const loader = ref(false)

const resetPassword = async () => {
  loader.value = true
  try {
    const { status, data, error } = await ResetPassword(userData)
    if (status.value === 'success') {
      console.log('notifications', notifications.value)
      handleALert('success', 'Password Updated')
    }
    if (status.value === 'error') {
      handleALert('error', error.value.data.message)
    }
  }
  catch (error) {
    console.error('Error fetching notifications:', error)
    handleError('error', error.message)
  }
  finally {
    loader.value = false
  }
}
</script>

<template>
  <div class="card card-compact bg-base-100 w-1/2 shadow-xl p-5">
    <div class="card-body">
      <h1 class="text-[#232323] text-3xl font-bold satoshiM text-center">
        Password Reset
      </h1>
      <BaseInput
        v-model="userData.old_password"
        label="Current Password"
        type="password"
        :icon="true"
        icon-type="password"
        class="mb-3"
        :required="true"
      />
      <BaseInput
        v-model="userData.new_password"
        label="New Password"
        type="password"
        :icon="true"
        icon-type="password"
        class="mb-3"
        :required="true"
      />
      <BaseInput
        v-model="userData.new_password_confirmation"
        label="Confirm Password"
        type="password"
        :icon="true"
        icon-type="password"
        class="mb-3"
        :required="true"
      />
      <button
        class="btn btn-neutral bg-black text-white"
        @click="resetPassword"
      >
        <span
          v-if="loader"
          class="loading loading-spinner loading-md"
        />
        <span
          v-else
        >Reset
          Password
        </span>
      </button>
    </div>
  </div>
</template>
