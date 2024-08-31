<script setup>
</script>

<template>
  <div class="card card-compact bg-base-100 w-1/2 shadow-xl p-5">
    <div class="card-body">
      <h1 class="text-[#232323] text-3xl font-bold satoshiM text-center">
        Password Reset
      </h1>
      <BaseInput
        label="Current Password"
        type="password"
        :icon="true"
        icon-type="password"
        class="mb-3"
      />
      <BaseInput
        label="New Password"
        type="password"
        :icon="true"
        icon-type="password"
        class="mb-3"
      />
      <BaseInput
        label="Confirm Password"
        type="password"
        :icon="true"
        icon-type="password"
        class="mb-3"
      />
      <button class="btn btn-neutral bg-black text-white">
        Reset Passsword
      </button>
    </div>
  </div>
</template>
