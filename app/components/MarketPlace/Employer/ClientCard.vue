<script setup>
import { useGlobalStore } from '@/store/index'

const store = useGlobalStore()
const openProfile = () => {
  store.$patch({
    isProfileEnabled: true,
    profileName: 'Raman Ismail',
  })
}
const openContact = () => {
  store.isContactEnabled = true
}
</script> store.isContactEnabled: true,

<template>
  <div class="card card-compact bg-base-100 w-80 shadow-xl">
    <div class="card-body">
      <!-- Header -->
      <div class="flex items-center gap-6 mb-2">
        <!-- avatar -->
        <div class="avatar">
          <div class="ring-darkGold ring-offset-base-100 w-16 rounded-full ring ring-offset-2">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp">
          </div>
        </div>
        <!-- Profile desc -->
        <div>
          <h3 class="mb-1 text-[#24242] font-semibold text-sm">
            Raman Ismail
          </h3>
          <div class="text-xs py-1 px-2 bg-gray-200 tag rounded-sm mb-2">
            <span class="text-black">Front-End</span>
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

      <div
        class="alert mb-2"
      >
        <p>
          As an expert with over 20 years of experience, I've seen remarkable advancements in technology, making it more accessible and beneficial for everyday use.
        </p>
      </div>

      <!-- Footer -->
      <div class="card-actions justify-between gap-4">
        <button
          class="btn btn-outline flex-1 rounded-2xl border-gray-300 border-2"
          @click="openContact()"
        >
          Contact
        </button>
        <button
          class="btn btn-neutral flex-1 rounded-2xl border-2"
          @click="openProfile()"
        >
          Profile
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.tag {
  width: fit-content;
}
</style>
