<script setup>
const images = import.meta.glob('@/assets/images/UIElements/img_*.jpg', { eager: true })
const ImageArray = Object.values(images).map(module => module.default)
</script>

<template>
  <div
    class="flex flex-wrap flex-row gap-10"
  >
    <div
      v-for="(image, index) in ImageArray"
      :key="index"
      class="card card-compact bg-base-100 w-[300px] h-[320px] shadow-xl p-4"
    >
      <img
        :src="image"
        :alt="`Image ${index + 1}`"
        class=" h-[100%]"
      >
    </div>
  </div>
</template>
