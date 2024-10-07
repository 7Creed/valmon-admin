<script setup>
import { useGlobalStore } from '@/store'

const store = useGlobalStore()

const Tab = ref('profile')
const toggleTab = (tab) => {
  Tab.value = tab
}
</script>

<template>
  <div class="">
    <div class="flex justify-between">
      <!-- Tab -->
      <div

        class="flex bg-white p-3 rounded-xl w-2/6 items-center justify-evenly mb-6"
      >
        <a
          href="javascript:void(0);"
          class="text-sm font-medium text-[#A0A3BD] satoshiM border-b-4 border-b-transparent"
          :class="{ border_b: Tab === 'profile' }"
          @click="toggleTab('profile')"
        >Basic Information</a>
        <a
          v-show="store.isEmployee"
          href="javascript:void(0);"
          class="text-sm font-medium text-[#A0A3BD] satoshiM border-b-4 border-b-transparent"
          :class="{ border_b: Tab === 'gallery' }"
          @click="toggleTab('gallery')"
        >Work Gallery</a>
        <a
          v-show="store.isEmployee"
          href="javascript:void(0);"
          class="text-sm font-medium text-[#A0A3BD] satoshiM border-b-4 border-b-transparent"
          :class="{ border_b: Tab === 'services' }"
          @click="toggleTab('services')"
        >Services</a>
        <a
          href="javascript:void(0);"
          class="text-sm font-medium text-[#A0A3BD] satoshiM border-b-4 border-b-transparent"
          :class="{ border_b: Tab === 'listings' }"
          @click="toggleTab('listings')"
        >Marketplace Listings</a>
      </div>
      <RouterLink to="/addlisting">
        <button
          v-show="Tab === 'listings'"
          class="btn btn-neutral"
        >
          Add Listing
        </button>
      </RouterLink>
      <button
        v-show="Tab === 'gallery' && store.isEmployee"
        class="btn btn-neutral"
        onclick="my_modal_1.showModal()"
      >
        Add Image
      </button>
      <button
        v-show="Tab === 'services' && store.isEmployee"
        class="btn btn-neutral"
        onclick="my_modal_3.showModal()"
      >
        Add Service
      </button>
    </div>
    <!-- Content -->
    <LazyMarketPlaceEmployerBasicInfo v-if="Tab === 'profile'" />
    <MarketPlaceEmployerMarketListingOnProfile v-if="Tab === 'listings'" />
    <MarketPlaceEmployerWorkGallery v-if="Tab === 'gallery'" />
    <MarketPlaceEmployerServices v-if="Tab === 'services'" />
  </div>

  <dialog
    v-show="Tab === 'gallery' && store.isEmployee"
    id="my_modal_1"
    class="modal"
  >
    <div class="modal-box">
      <a
        href="javascript:void(0)"
        class="text-black block mb-5"
      >
        <h1 class="satoshiB text-xl text-center mb-5 ">
          Upload Image
        </h1>
        <div class="border-dashed border-2 flex flex-col items-center justify-between p-4 border-[rgba(38,44,63,0.48)]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-20 mb-3"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
            />
          </svg>
          <div class="text-sm text-[#5B5B5B] mb-1">
            <span class="text-[#030359]">Select</span> Image you want to upload
          </div>
          <div class="text-[#949CA9]">
            Png and Jpg Allowed
          </div>
        </div>
      </a>
      <button class="btn btn-neutral text-white w-full">
        Upload Image
      </button>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn">
            Close
          </button>
        </form>
      </div>
    </div>
  </dialog>
</template>
