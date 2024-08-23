<script setup>
const props = defineProps({
  title: String,
  text: String,
})
</script>

<template>
  <div class="card bg-base-100 w-full shadow-xl">
    <div class="card-body">
      <h2 class="card-title text-2xl text-darkGold justify-center mb-2">
        {{ props.title }}
      </h2>
      <p class="text-center text-base">
        {{ props.text }}
      </p>
    </div>
  </div>
</template>
