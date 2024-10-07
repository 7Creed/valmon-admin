<script setup>
import rectanglebg from '@/assets/images/UIElements/Rectangle.png'
</script>

<template>
  <div class="hero cover justify-items-start">
    <div class="relative z-10 ms-[96px]">
      <img
        :src="rectanglebg"
        alt="rectangular back-drop"
        class="absolute -z-10 w-28 rectBg right-[200px] top-[50px] "
      >
      <p class="text-white text-6xl font-extrabold w-96 leading-[67px]">
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
  height: 550px;
}
</style>
