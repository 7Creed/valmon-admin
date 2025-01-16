<script setup>
import Plus from '@/assets/icons/plus.svg'
import rightArrow from '@/assets/icons/rightarrow.svg'
import rectangle from '@/assets/images/UIElements/Rectangle.png'
</script>

<template>
  <div
    class="hero h-[600px] lg:min-h-screen"
  >
    <div class="hero-overlay bg-opacity-10" />
    <div class="hero-content text-white text-center">
      <div class="max-w-full relative">
        <h1 class="mb-10 text-3xl md:text-5xl font-extrabold">
          Showcase Your Skills, Connect with Clients
        </h1>
        <img
          :src="rectangle"
          alt=""
          class="absolute rectangle w-14 lg:w-20 right-[12rem] lg:right-[17rem] "
        >
        <p class="mb-12 text-lg font-medium ">
          Find the perfect freelancer for your project or discover your next freelance opportunity
        </p>
        <div class="text-base font-medium">
          <button class="btn btn-outline bg-inherit text-white border-2 bg-gradient-to-r hover:from-[#C09742] hover:to-[#C09742] hover:border-[#CFB159]">
            <span class="text-base font-medium">Hire Expert</span>
            <img
              :src="rightArrow"
              alt="right arrow icon"
            >
          </button>
          <button class="btn btn-outline bg-inherit text-white border-2 bg-gradient-to-r hover:from-[#C09742] hover:to-[#C09742] hover:border-[#CFB159] ms-5">
            <span class="text-base font-medium select2"> Sell Your Skills</span>
            <img
              :src="Plus"
              alt="Plus icon"
            >
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.hero {
  background-image: url('../../assets/images/UIElements/Hero.png');
}
.rectangle {
    z-index: -1;
  top: 0px;
}
</style>
