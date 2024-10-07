<script setup>
import MainProductView from '@/assets/images/UIElements/mainproductview.png'
import car from '@/assets/images/UIElements/car.png'
import car1 from '@/assets/images/UIElements/car1.png'
import car2 from '@/assets/images/UIElements/car2.png'

// Import useState composable
import { useActiveView } from '@/composables/state'

// Initialization
const { setMarketPlaceChatId } = useActiveView()
// Manage Product Image View
const productImages = [MainProductView, car1, car2, car, car1, car2]

const ProductView = ref(MainProductView)

function updateProductImage(image) {
  ProductView.value = image
}

async function openChat() {
  navigateTo('/chat')

  setMarketPlaceChatId('marketPlace')
}

async function openContact() {
  navigateTo('/profile')

  setMarketPlaceChatId('marketPlace')
}
</script>

<template>
  <div class="w-full">
    <div class="h-[630px] flex gap-10 container mx-auto mb-8">
      <!-- Left -->
      <div class="card flex-row justify-center items-start card-compact bg-base-100 w-[60%] shadow-xl p-4">
        <figure class="flex h-full w-full">
          <img
            :src="ProductView"
            alt="Shoes"
            class="h-full w-full"
          >
        </figure>
        <div class="card-body">
          <div
            v-for="(item, index) in productImages"
            :key="index"
            class="avatar"
            @click="updateProductImage(item)"
          >
            <div class="w-20 rounded-lg">
              <img :src="item">
            </div>
          </div>
        </div>
      </div>

      <!-- right -->
      <div class="card card-compact bg-base-100 w-[40%] shadow-xl text-[#242424]">
        <div class="card-body">
          <!-- header -->
          <div class="flex justify-between items-center mb-3">
            <h2 class="card-title">
              Mercedes Benz AMG
            </h2>
            <span class="w-fit p-1 center bg-white rounded-full border-2">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.4"
                  d="M15.2852 2.03076H6.71627C4.83182 2.03076 3.28516 3.57743 3.28516 5.46187V17.9863C3.28516 19.5863 4.43182 20.2619 5.83627 19.4885L10.174 17.0797C10.6363 16.8219 11.3829 16.8219 11.8363 17.0797L16.174 19.4885C17.5785 20.2708 18.7252 19.5952 18.7252 17.9863V5.46187C18.7163 3.57743 17.1785 2.03076 15.2852 2.03076Z"
                  fill="#292D32"
                />
                <path
                  d="M10.1911 12.1103C10.0222 12.1103 9.85336 12.0481 9.72003 11.9147L8.38669 10.5814C8.12891 10.3236 8.12891 9.89697 8.38669 9.63919C8.64447 9.38141 9.07114 9.38141 9.32891 9.63919L10.1911 10.5014L13.2756 7.41697C13.5334 7.15919 13.96 7.15919 14.2178 7.41697C14.4756 7.67474 14.4756 8.10141 14.2178 8.35919L10.6622 11.9147C10.5289 12.0481 10.36 12.1103 10.1911 12.1103Z"
                  fill="#292D32"
                />
              </svg>
            </span>
          </div>
          <hr class="mb-5">
          <div class="flex items-center justify-between mb-4">
            <p>Price</p>
            <strong>NGN 56,778</strong>
          </div>
          <div class="flex items-center justify-between mb-4">
            <p>Negotiable</p>
            <strong>Yes</strong>
          </div>
          <div class="flex items-center justify-between mb-4">
            <p>Condition</p>
            <strong>Used</strong>
          </div>

          <div class="flex items-center justify-between mb-4">
            <p>Colour</p>
            <strong>Silver</strong>
          </div>

          <!-- Description -->
          <div class="bg-[#F4F4F4] p-2 mb-5">
            <h2 class="font-extrabold satoshiM">
              Description
            </h2>
            <p>
              Experience the ultimate in luxury and performance with the Mercedes-Benz AMG!
              This car is a masterpiece, featuring a handcrafted,
              high-powered engine and sleek, aerodynamic design.
              You'll love the responsive V8s and advanced hybrid powertrains,
              and the interior is a dream with premium materials and cutting-edge
              tech for your comfort and convenience. With a legacy in motorsport,
              AMG offers precision handling and a dynamic driving experience. Don’t
              miss out—buy this Mercedes-Benz AMG now and elevate your driving
              journey to a whole new level!
            </p>
          </div>
          <!-- Profile Details -->
          <div class="flex items-center justify-between mb-5">
            <div class="flex  items-center gap-3 mb-2">
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

            <button
              class="btn btn-outline  w-2/4"
              @click="openContact()"
            >
              Profile
            </button>
          </div>
          <button
            class="btn btn-neutral"
            @click="openChat()"
          >
            Contact
          </button>
        </div>
      </div>
    </div>

    <div class="similar-listings container mx-auto">
      <h1 class="font-extrabold text-xl satoshiM mb-4">
        Similar Listings
      </h1>
      <div class="flex flex-wrap justify-between">
        <MarketPlaceEmployerMarket
          v-for="(item, index) in 4"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
