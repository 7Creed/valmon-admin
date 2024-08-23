<script setup>
const emits = defineEmits(['nextEvent', 'prevEvent'])

const emitEvent = (event) => {
  emits(event)
}
</script>

<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title text-[rgba(35, 35, 35, 1)] font-bold text-3xl">
        Verify OTP
      </h2>
      <p class="text-[rgba(106, 106, 106, 1)] text-lg mb-5">
        Input one time password sent to Fav****@Gmail.com To Continue?
      </p>
      <BaseInput
        type="text"
        label="OTP"
        placeholder="placeholder"
        class="mb-5"
      />
      <p class="text-[rgba(30, 30, 30, 1)] text-center mb-5">
        Didn’t receive any password?
      </p>
      <p class="text-darkGold text-center">
        Resend OTP
      </p>
      <div class="card-actions justify-between">
        <BaseButton
          title="Back"
          color="rgba(255, 255, 255, 1)"
          text-color="#8B6914"
          border="#8B6914"
          :outline="true"
          class="block mb-5 w-[20%]"
          @click="emitEvent('prevEvent')"
        />
        <BaseButton
          title="Next"
          color="rgba(33, 31, 31, 1)"
          text-color="rgba(255, 255, 255, 1)"
          border="#8B6914"
          :outline="false"
          class="block mb-5 w-[20%]"
          @click="emitEvent('nextEvent')"
        />
      </div>
    </div>
  </div>
</template>
