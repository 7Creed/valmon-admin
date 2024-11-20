<script setup>
const props = defineProps({
  message: String,
})
</script>

<template>
  <p class="text-center text-gray-500">
    No {{ props.message }} available.
  </p>
</template>
