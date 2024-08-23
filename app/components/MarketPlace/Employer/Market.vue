<script setup>
import archivedTick from '@/assets/icons/archive-tick.svg'
</script>

<template>
  <div class="card card-compact bg-base-100 w-80 shadow-xl">
    <div class="archived p-2 bg-black rounded-full center absolute right-0">
      <img
        :src="archivedTick"
        alt="favorite icon"
        class="w-5"
      >
    </div>
    <div class="card-body">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        >
      </figure>
      <div class="flex items-center gap-6 mb-2">
        <!-- Profile desc -->
        <div>
          <h3 class="mb-2 text-[#24242] font-semibold text-sm">
            Product Name
          </h3>
          <div class="text-xs py-1 px-2 bg-gray-200 tag rounded-sm mb-2">
            <span class="text-black">Shoes</span>
          </div>
          <div class="text-lg text-[#242424] satoshiM">
            NGN 56,778
          </div>
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
