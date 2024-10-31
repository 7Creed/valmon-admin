<script setup>
import archivedTick from '@/assets/icons/archive-tick.svg'
import Testimonies from '@/assets/images/UIElements/testimoies.png'
</script>

<template>
  <div class="card card-compact p-4 w-80 border border-darkGold">
    <div class="">
      <figure class="flex mb-6">
        <img
          :src="Testimonies"
          alt="Shoes"
          class="w-full"
        >
      </figure>
      <div class="flex items-center gap-6 mb-2 text-center text-white">
        <!-- Profile desc -->
        <div class="text-white">
          <div class="text-sm  satoshiM mb-6">
            "This platform helped me connect with clients globally and build a diverse portfolio. I’ve landed projects from various industries and expanded my skills significantly."
          </div>
          <h3 class="mb-2 font-bold text-sm satoshiM">
            James Peter
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.tag, .archived {
  width: fit-content;
}
</style>
