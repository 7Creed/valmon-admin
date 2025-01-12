<script setup>
const props = defineProps({
  message: String,
})
</script>

<template>
  <div class="flex flex-col items-center justify-center h-full py-10 rounded-lg ">
    <p class="text-center text-gray-700 text-xl font-bold mb-2">
      No {{ props.message }} available.
    </p>
    <p class="text-center text-gray-500 mb-4">
      It seems we couldn't find any {{ props.message }} at the moment. Please check back later or try refreshing the page.
    </p>
   
  </div>
</template>
