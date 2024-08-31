<script setup>

</script>

<template>
  <div>
    <div
      v-for="(items, index) in 6 "
      :key="index"
      class="card card-compact bg-base-100 w-4/5 shadow-xl mb-5"
    >
      <div class="card-body flex-row items-center justify-between">
        <!-- avatar -->
        <div class="avatar">
          <div class="ring-darkGold ring-offset-base-100 w-14 rounded-full ring ring-offset-2">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp">
          </div>
        </div>
        <h3 class="mb-1 text-[#24242] font-semibold text-sm satoshiM">
          Raman Ismail
        </h3>
        <div class="text-xs py-1 px-2 bg-gray-200 tag rounded-sm mb-2">
          <span class="text-black">Front-End</span>
        </div>

        <div class="flex items-center gap-3">
          <div class="rating w-4">
            <input
              type="radio"
              name="rating-1"
              class="mask mask-star"
            >
          </div>
          <span class="text-xs font-bold satoshiM">4.7</span>
          <span class="text-black text-xs">(631 Ratings)</span>
        </div>
        <div class="bg-[#F0F2F5]  center p-2">
          <span class="text-lg font-semibold text-black satoshiM">NGN  195,799</span>
        </div>
        <button class="btn btn-active border-gray-300 border-2 satoshiM  bg-white text-red-600 text-sm font-medium rounded-2xl px-5">
          Report
        </button>
        <button class="btn btn-active border-gray-300 border-2 satoshiM  bg-white text-black text-sm font-medium rounded-2xl px-5">
          View Chat
        </button>
        <button class="btn btn-active btn-neutral rounded-2xl">
          Mark As complete
        </button>
      </div>
    </div>
  </div>
</template>
