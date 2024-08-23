<script setup>
import google from '@/assets/icons/google.svg'
</script>

<template>
  <div class="flex justify-items-center flex-row w-[90%]">
    <!-- Authentication -->
    <div class="Login flex-1 center">
      <div class="w-1/2">
        <div class="mb-9 ">
          <h1 class="text-3xl font-bold text-[rgba(35, 35, 35, 1)] mb-2">
            Sign In
          </h1>
          <p class="text-lg text-[rgba(106, 106, 106, 1)]">
            Please login to continue to your account.
          </p>
        </div>
        <BaseInput
          label="Email"
          type="email"
          placeholder="Johndoe@email.com"
          class="mb-6 "
        />
        <BaseInput
          label="Password"
          type="password"
          :icon="true"
          icon-type="password"
        />
        <div class="form-control mb-5">
          <label class="label cursor-pointer justify-start">
            <input
              type="checkbox"
              class="checkbox border-2 border-[rgba(0, 0, 0, 1)]"
            >
            <span class=" ms-2 label-text text-base text-[rgba(35, 35, 35, 1)]">Keep me logged in</span>
          </label>
        </div>
        <BaseButton
          title="Sign In"
          color="#8B6914"
          text-color="rgba(255, 255, 255, 1)"
          :outline="false"
          class="block w-full mb-5"
        />
        <div class="divider mb-5">
          OR
        </div>
        <div>
          <BaseButton
            title="Sign in with Google"
            color="rgba(255, 255, 255, 1)"
            text-color="rgba(35, 35, 35, 1)"
            border="rgba(230, 232, 231, 1)"
            :outline="true"
            alt="google"
            :src="google"
            class=" w-full mb-5"
          />
        </div>
        <p class="text-lg font-semibold text-center">
          Don’t Have account? <NuxtLink
            to="/getstarted"
            class=" text-darkGold"
          >
            Sign Up
          </NuxtLink>
        </p>
      </div>
    </div>
    <!-- Images -->
    <div class=" flex-1">
      <authValmon />
    </div>
  </div>
</template>

<style>
</style>
