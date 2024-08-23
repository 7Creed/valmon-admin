<script setup>
import rectangle from '@/assets/images/UIElements/Rectangle.png'
import testimonial from '@/assets/images/UIElements/testimonial.jpg'
</script>

<template>
  <div class="  bg-stone-950 min-h-screen pb-28 relative">
    <h1 class="text-5xl font-bold text-white text-center pt-20 mb-12 relative w-fit mx-auto z-10">
      Testimonials
      <img
        :src="rectangle"
        alt="rectangular-background"
        class="w-16 top-[5rem] left-9 absolute -z-10"
      >
    </h1>
    <div class="container mx-auto mt-8 p-10  rounded-lg center flex-wrap gap-4">
      <!-- Testimonial card -->
      <div
        v-for="(item, index) in 16"
        :key="index"
        class="card card-compact bg-base-100 w-72 shadow-xl rounded-sm"
      >
        <figure>
          <img
            :src="testimonial"
            alt="testimonial-1"
          >
        </figure>
        <div class="card-body bg-black">
          <p class="text-white font-bold">
            My Name
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
