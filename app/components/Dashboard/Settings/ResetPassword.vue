<script setup>
import { SettingsController } from '~/services/modules/Admin/settings'

const { ResetPassword } = SettingsController()

const passwordData = reactive({
  current_password: '',
  password: '', // User's Password
  password_confirmation: '', // User's Password
})

const Loading = ref(false)
const resetPassword = async () => {
  if (Object.values(passwordData).every(e => e == '')) {
    console.log('Missing fields')
    return
  }
  Loading.value = true
  const { data, error, status } = await ResetPassword(passwordData)
  if (status.value === 'success') {
    Loading.value = false
    handleALert('success', data.value.message)
  }
  if (status.value === 'error') {
    Loading.value = false
    handleALert('error', error.value.data.message)
  }
}
</script>

<template>
  <div>
    <div class="card card-compact bg-base-100 w-2/5 shadow-xl">
      <!-- form -->
      <div class="card-body">
        <form>
          <BaseInput
            v-model="passwordData.current_password"
            label="Current Password"
            type="password"
            :icon="true"
            icon-type="password"
            class="mb-5 "
          />
          <BaseInput
            v-model="passwordData.password"
            label="New Password"
            type="password"
            :icon="true"
            icon-type="password"
            class="mb-5 "
          />
          <BaseInput
            v-model="passwordData.password_confirmation"
            label="Confirm Password"
            type="password"
            :icon="true"
            icon-type="password"
            class="mb-5 "
          />
          <BaseButton
            :loading="Loading"
            title="Reset Password"
            color="black"
            text-color="rgba(255, 255, 255, 1)"
            :outline="false"
            class="block w-full mb-5"
            @click="resetPassword"
          />
        </form>
      </div>
    </div>
  </div>
</template>
