<script setup></script>

<template>
  <div class="overflow-auto h-96">
    <div
      v-for="(items, index) in 12 "
      :key="index"
      class="flex items-center gap-4 mb-4 hover:bg-[#FEFDDA]"
    >
      <!-- Avatar -->
      <div class="avatar">
        <div class="w-12 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp">
        </div>
      </div>
      <!-- Chat preview -->
      <div class="text-[rgba(0,0,0,1)] grow">
        <div class="flex items-baseline justify-between mb-1">
          <span class="text-sm satoshiM">Mane Regin</span>
          <span class="text-xs">8 Mins</span>
        </div>
        <div class="flex items-baseline justify-between">
          <span class="text-xs">
            Hello, how is your experience in the ...
          </span>
          <span
            class="w-5 h-5 p-1 center bg-darkGold text-white text-[12px] rounded-full"
          ><span>3</span></span>
        </div>
      </div>
    </div>
  </div>
</template>
