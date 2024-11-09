<script setup>
import Logo from '@/assets/images/Logo/valmon.svg'

provide('signUpType', 'employer')
definePageMeta({
  layout: false,
})
</script>

<template>
  <div class="p-12 bg-white">
    <img
      :src="Logo"
      alt="Valmon logo"
      class="w-20"
    >
    <div class="min-h-[80vh] center">
      <authVerify />
    </div>
  </div>
</template>
