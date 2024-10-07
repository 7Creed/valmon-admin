<script setup>
import MainProductView from '@/assets/images/UIElements/mainproductview.png'
import car from '@/assets/images/UIElements/car.png'
import car1 from '@/assets/images/UIElements/car1.png'
import car2 from '@/assets/images/UIElements/car2.png'

// Import useState composable
import { useActiveView } from '@/composables/state'

const emit = defineEmits('viewChat')
// Initialization
const { setMarketPlaceChatId } = useActiveView()
// Manage Product Image View
const productImages = [MainProductView, car1, car2, car, car1, car2]

const ProductView = ref(MainProductView)

function updateProductImage(image) {
  ProductView.value = image
}

async function openChat() {
  emit('viewChat')
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
      <div class="card flex-col justify-center items-start card-compact bg-base-100 w-[50%] shadow-xl p-4">
        <figure class="flex h-full w-full">
          <img
            :src="ProductView"
            alt="Shoes"
            class="h-full w-full"
          >
        </figure>
        <div class="card-body flex-row justify-center w-full">
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
          <div class="flex justify-between items-center mb-2">
            <h2 class="card-title">
              Mercedes Benz AMG
            </h2>
            <span class="center gap-2 bg-[#D0F18A] p-2 px-3 rounded-xl">
              <span>
                <!-- escrow -->
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="6.27275"
                    cy="6.2476"
                    r="4.12138"
                    fill="#687083"
                  />
                </svg>
                <!-- Active -->
                <svg
                  v-if="false"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="6.27284"
                    cy="6.2476"
                    r="4.12138"
                    fill="#E79E1F"
                  />
                </svg>
              </span>
              <span class="">Escrow</span>
            </span>
          </div>
          <hr class="mb-5">
          <div class="flex items-center justify-between mb-2">
            <p>Price</p>
            <strong>NGN 56,778</strong>
          </div>
          <div class="flex items-center justify-between mb-2">
            <p>Negotiable</p>
            <strong>Yes</strong>
          </div>
          <div class="flex items-center justify-between mb-2">
            <p>Condition</p>
            <strong>Used</strong>
          </div>

          <div class="flex items-center justify-between mb-2">
            <p>Colour</p>
            <strong>Silver</strong>
          </div>

          <!-- Description -->
          <div class="bg-[#F4F4F4] p-2 mb-3">
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
          <div class="flex items-center justify-between mb-3">
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
            View Chat
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
