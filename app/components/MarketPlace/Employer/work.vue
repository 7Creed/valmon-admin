<script setup>
// Icons
import heart from '@/assets/icons/heart-circle.svg'
import send from '@/assets/icons/send-2.svg'
import copySuccess from '@/assets/icons/copy-success.svg'
import location from '@/assets/icons/location.svg'

const workerTab = ref('profile')
const toggleTab = (tab) => {
  workerTab.value = tab
}
</script>

<template>
  <div class="flex gap-8 pb-20">
    <aside>
      <div class="card card-compact bg-base-100 w-72 shadow-xl">
        <div class="card-body">
          <div class="card-header mb-1 flex items-center justify-between">
            <a
              href="javascript:void(0)"
              class="w-fit bg-gray-400 p-1 center rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-4"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
            <div class="flex items-center gap-2 justify-center">
              <img
                :src="heart"
                alt="heart icon"
                class="h-7"
              >
              <img
                :src="send"
                alt="heart icon"
                class="h-7"
              >
            </div>
          </div>
          <!-- Header -->
          <div class="flex items-center gap-6 mb-2">
            <!-- avatar -->
            <div class="avatar">
              <div
                class="ring-darkGold ring-offset-base-100 w-12 rounded-full ring ring-offset-2"
              >
                <img
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                >
              </div>
            </div>
            <!-- Profile desc -->
            <div>
              <h3 class="mb-1 text-[#24242] font-semibold text-sm">
                Raman Ismail
              </h3>
              <div class="text-xs py-1 px-2 bg-gray-200 tag rounded-sm mb-2">
                <span class="t#62646Aext-black">Front-End</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="rating w-4">
                  <input
                    type="radio"
                    name="rating-1"
                    class="mask mask-star"
                  >
                </div>
                <span class="text-xs font-bold">4.7</span>
                <span class="text-black text-xs">(631 Ratings)</span>
              </div>
            </div>
          </div>
          <!-- body -->

          <div class="alert mb-2 block">
            <h3 class="font-bold mb-2">
              About Me
            </h3>
            <p class="text-xs">
              As an expert with over 20 years of experience, I've seen
              remarkable advancements in technology, making it more accessible
              and beneficial for everyday use.
            </p>
          </div>
          <div
            class="flex justify-between items-center text-[#404145] text-xs mb-1"
          >
            <span class="font-medium">Inbox response time</span>
            <span class="font-bold">3 Mins</span>
          </div>
          <div
            class="flex justify-between items-center text-[#404145] text-xs mb-1"
          >
            <span class="font-medium">Inbox response time</span>
            <span class="font-bold">3 Mins</span>
          </div>
          <div
            class="flex gap-2 items-center text-[#62646A] text-xs w-1/2 mb-1"
          >
            <img
              :src="location"
              alt="Location icon"
              class="h-5"
            >
            <span class="font-medium text-[rgba(0,0,0,1)]">Lagos, Nigeria</span>
          </div>
          <div class="flex gap-2 items-center text-[#62646A] text-xs mb-1">
            <img
              :src="copySuccess"
              alt="copy-success icon"
              class="h-5"
            >
            <span class="text-[rgba(0,0,0,1)] font-medium">65 jobs Completed</span>
          </div>
          <!-- Online Presence -->
          <div class="relative flex gap-2">
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                opacity="0.2"
                cx="9"
                cy="9"
                r="9"
                fill="#0CA408"
              />
            </svg>
            <svg
              class="absolute top-[4px] left-[5px]"
              width="9"
              height="10"
              viewBox="0 0 9 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="4.5"
                cy="5"
                r="4.5"
                fill="#0CA408"
              />
            </svg>
            <span class="text-sm font-bold text-green-500">Online</span>
          </div>
          <!-- Footer -->
          <div class="card-actions justify-between gap-4">
            <button
              class="btn btn-outline flex-1 rounded-2xl border-gray-300 border-2"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </aside>
    <!-- main -->
    <section class="flex-1 ">
      <!-- Tab -->
      <div
        class="flex bg-white p-3 rounded-xl w-1/2 items-center justify-evenly mb-6"
      >
        <a
          href="javascript:void(0);"
          class="text-sm font-medium text-[#A0A3BD] satoshiM border-b-4 border-b-transparent"
          :class="{ border_b: workerTab === 'profile' }"
          @click="toggleTab('profile')"
        >Profile Brief</a>
        <a
          href="javascript:void(0);"
          class="text-sm font-medium text-[#A0A3BD] satoshiM border-b-4 border-b-transparent"
          :class="{ border_b: workerTab === 'gallery' }"
          @click="toggleTab('gallery')"
        >Work Gallery</a>
        <a
          href="javascript:void(0);"
          class="text-sm font-medium text-[#A0A3BD] satoshiM border-b-4 border-b-transparent"
          :class="{ border_b: workerTab === 'service' }"
          @click="toggleTab('service')"
        >Services</a>
        <a
          href="javascript:void(0);"
          class="text-sm font-medium text-[#A0A3BD] satoshiM border-b-4 border-b-transparent"
          :class="{ border_b: workerTab === 'review' }"
          @click="toggleTab('review')"
        >Reviews</a>
        <a
          href="javascript:void(0);"
          class="text-sm font-medium text-[#A0A3BD] satoshiM border-b-4 border-b-transparent"
          :class="{ border_b: workerTab === 'marketplace' }"
          @click="toggleTab('marketplace')"
        >Marketplace Listings</a>
      </div>
      <!-- Content -->
      <MarketPlaceEmployerBriefProfile v-if="workerTab === 'profile'" />
      <MarketPlaceEmployerWorkGallery v-if="workerTab === 'gallery'" />
      <MarketPlaceEmployerServices v-if="workerTab === 'service'" />
      <MarketPlaceEmployerReviews v-if="workerTab === 'review'" />
      <MarketPlaceEmployerMarketListing v-if="workerTab === 'marketplace'" />
    </section>
  </div>
</template>

<style>
.border_b {
  @apply border-b-darkGold pb-1 !important;
}
</style>
