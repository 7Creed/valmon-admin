<script setup>
definePageMeta({
  layout: false,
})
// Get the full URL from the window object
const url = window.location.href

// Parse the query parameters
const params = new URLSearchParams(window.location.search).get('page')
const CRFromLanding = ref(false)
if (params === 'hireexpert') CRFromLanding.value = true
</script>

<template>
  <div class="min-h-screen center bg-white">
    <authRegistration :client-registration="CRFromLanding" />
  </div>
</template>
