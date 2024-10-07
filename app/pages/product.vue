<script setup>
// import { useActiveView } from '@/composables/state'

import { useGlobalStore } from '@/store'

// const { state } = useActiveView()
// const headerTab = computed(() => state.value.marketPlaceHeaderTab)
definePageMeta({
  layout: 'market-place',
})
const store = useGlobalStore()

// Handles the product information view
const view = ref('viewProduct')
function viewProduct(product) {
  view.value = product
}
</script>

<template>
  <div class="pb-14">
    <!-- The Header -->
    <NavigationMarketplaceHeader />
    <div class="Product-view pt-40 px-10 flex gap-10 bg-primary_bg">
      <!-- Filter  -->
      <div
        v-if="view === ''"
        class="filter-container w-96 text-black"
      >
        <h1 class="text-xl font-extrabold mb-3">
          Filter List
        </h1>
        <!-- Price -->
        <div class="price-container mb-3">
          <div class="flex justify-between  bg-white shadow-sm p-2 border-[1.5px]">
            <h2 class="font-semibold">
              Price
            </h2>
            <div class="bg-black center p-1 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#ffff"
                class="size-4"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
          <!-- drop down content -->
          <div class="flex flex-col justify-between  bg-white shadow-sm p-5">
            <input
              type="range"
              min="0"
              max="100"
              value="40"
              class="range range-xs mb-3"
            >
            <p class="text-sm">
              Price:<strong class="ms-2">50,000 — 150,500</strong>
            </p>
          </div>
        </div>

        <!-- Price -->
        <div class="price-container mb-3">
          <div class="flex justify-between  bg-white shadow-sm p-2 border-[1.5px]">
            <h2 class="font-semibold">
              Color
            </h2>
            <div class="bg-black center p-1 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#ffff"
                class="size-4"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
          <!-- drop down content -->
          <div class="flex flex-col justify-between  bg-white shadow-sm p-5">
            <div class="form-control mb-4">
              <label class="label cursor-pointer justify-start">

                <input
                  type="checkbox"
                  checked="checked"
                  class="checkbox"
                >
                <span class="label-text ms-3">Red</span>
              </label>
            </div>
            <div class="form-control mb-3">
              <label class="label cursor-pointer justify-start">

                <input
                  type="checkbox"
                  checked="checked"
                  class="checkbox"
                >
                <span class="label-text ms-3">Yellow</span>
              </label>
            </div>
            <div class="form-control mb-3">
              <label class="label cursor-pointer justify-start">

                <input
                  type="checkbox"
                  checked="checked"
                  class="checkbox"
                >
                <span class="label-text ms-3">Black</span>
              </label>
            </div>
            <div class="form-control mb-3">
              <label class="label cursor-pointer justify-start">

                <input
                  type="checkbox"
                  checked="checked"
                  class="checkbox"
                >
                <span class="label-text ms-3">White</span>
              </label>
            </div>
            <div class="form-control mb-3">
              <label class="label cursor-pointer justify-start">

                <input
                  type="checkbox"
                  checked="checked"
                  class="checkbox"
                >
                <span class="label-text ms-3">Blue</span>
              </label>
            </div>
            <div class="form-control mb-3">
              <label class="label cursor-pointer justify-start">

                <input
                  type="checkbox"
                  checked="checked"
                  class="checkbox"
                >
                <span class="label-text ms-3">Gold</span>
              </label>
            </div>
          </div>
        </div>
        <!-- Location -->
        <div class="flex justify-between  bg-white shadow-sm p-2 border-[1.5px] mb-3">
          <h2 class="font-semibold">
            location
          </h2>
          <div class="bg-black center p-1 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#ffff"
              class="size-4"
            >
              <path
                fill-rule="evenodd"
                d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>

        <!-- Condition -->
        <div class="flex justify-between  bg-white shadow-sm p-2 border-[1.5px] mb-3">
          <h2 class="font-semibold">
            Condition
          </h2>
          <div class="bg-black center p-1 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#ffff"
              class="size-4"
            >
              <path
                fill-rule="evenodd"
                d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
        <!-- Brand -->
        <div class="flex justify-between  bg-white shadow-sm p-2 border-[1.5px] mb-3">
          <h2 class="font-semibold">
            Brand
          </h2>
          <div class="bg-black center p-1 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#ffff"
              class="size-4"
            >
              <path
                fill-rule="evenodd"
                d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
      <!-- PRODUCTS -->
      <div
        v-if="view === ''"
        class="product flex-1"
      >
        <!-- Component -->
        <div>
          <h1 class="mb-4 text-xl font-extrabold">
            Cars
          </h1>
          <div
            v-if="store.marketPlaceHeaderTab === 'car'"
            class="flex flex-row flex-wrap gap-6"
          >
            <MarketPlaceEmployerMarket
              v-for="(items, index) in 16"
              :key="index"
              @click="viewProduct('viewProduct')"
            />
          </div>
        </div>
      </div>
      <!-- PRODUCT VIEW -->
      <MarketPlaceMarketProductInformation v-if="view === 'viewProduct'" />
    </div>
  </div>
</template>
