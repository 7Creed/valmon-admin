<script setup>
const userData = reactive({
  email: userInfo.value.email ?? null,
  token: token.value ?? null,
  current_password: '',
  new_password: '',
  confirm_password: '',
})
</script>

<template>
  <div class="card card-compact bg-base-100 w-1/2 shadow-xl p-5">
    <div class="card-body">
      <h1 class="text-[#232323] text-3xl font-bold satoshiM text-center">
        Password Reset
      </h1>
      <BaseInput
        v-model="userData.current_password"
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
        v-model="userData.confirm_password"
        label="Confirm Password"
        type="password"
        :icon="true"
        icon-type="password"
        class="mb-3"
        :required="true"
      />
      <button
        class="btn btn-neutral bg-black text-white"
        @click="ResetPassword"
      >
        <span
          v-if="loading"
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
