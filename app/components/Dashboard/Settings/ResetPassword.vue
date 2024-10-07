<script setup>
</script>

<template>
  <div>
    <div class="card card-compact bg-base-100 w-2/5 shadow-xl">
      <!-- form -->
      <div class="card-body">
        <form>
          <BaseInput
            label="Current Password"
            type="password"
            :icon="true"
            icon-type="password"
            class="mb-5 "
          />
          <BaseInput
            label="New Password"
            type="password"
            :icon="true"
            icon-type="password"
            class="mb-5 "
          />
          <BaseInput
            label="Confirm Password"
            type="password"
            :icon="true"
            icon-type="password"
            class="mb-5 "
          />
          <BaseButton
            title="Reset Password"
            color="black"
            text-color="rgba(255, 255, 255, 1)"
            :outline="false"
            class="block w-full mb-5"
          />
        </form>
      </div>
    </div>
  </div>
</template>
