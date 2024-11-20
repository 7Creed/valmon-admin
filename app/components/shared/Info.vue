<script setup>
const props = defineProps({
  message: String,
})
</script>

<template>
  <div class="flex flex-col items-center justify-center p-8 bg-yellow-50 rounded-lg border border-yellow-200">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-12 w-12 text-yellow-400 mb-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
    <p class="text-center text-gray-700 font-medium text-lg mb-2">
      No {{ props.message }} Available
    </p>
    <p class="text-center text-gray-500 text-sm">
      Please check back later or try refreshing the page
    </p>
  </div>
</template>
