<script setup>
import rectanglebg from '@/assets/images/UIElements/Rectangle.png'
</script>

<template>
  <div class="hero h-[300px] md:h-[550px] cover justify-items-start">
    <div class="relative z-10 lg:ms-[96px] px-4 text-white">
      <img
        :src="rectanglebg"
        alt="rectangular back-drop"
        class="absolute -z-10 w-28 rectBg right-[200px] top-[50px] "
      >
      <p class="text-white text-3xl md:text-6xl font-extrabold w-3/5 md:w-96 md:leading-[67px]">
        Discover
        the Best Deals
        on Valmon
      </p>
    </div>
  </div>
</template>

<style scoped>
.hero {
  background-image: url('@/assets/images/UIElements/marketplaceHero.png');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat ;
}
</style>
