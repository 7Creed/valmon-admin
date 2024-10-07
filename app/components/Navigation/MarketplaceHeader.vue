<script setup>
import archivedTick from '@/assets/icons/archive-tick.svg'

// store
import { useGlobalStore } from '@/store'

// Initialize Variables
const store = useGlobalStore()
// Show New Job Offer Modal
const popUp = ref(null)
onMounted(() => {
  setTimeout(() => {
    if (popUp.value && store.isEmployee) {
      popUp.value.click()
    }
  }, 1000)
})

// Update Tab
const activeTab = ref('')
async function changeTab(tab) {
  store.$patch({
    marketPlaceHeaderTab: tab,
  })
  await navigateTo('/product')
}

onMounted(() => {
  activeTab.value = store.marketPlaceHeaderTab
})
</script>

<template>
  <div class="bg-[#C09742] p-8 fixed w-full z-[1000]">
    <div class="text-black flex items-center justify-between container mx-auto">
      <a
        href="javascript:void(0);"
        class="text-base w-fit p-2 rounded-lg"
        :class="{ activeClass: activeTab === 'accessories' }"
        @click="changeTab('accessories')"
      >Accessories</a>
      <a
        href="javascript:void(0);"
        class="text-base w-fit p-2 rounded-lg"

        :class="{ activeClass: activeTab === 'allHoodies' }"
        @click="changeTab('allHoodies')"
      >All Hoodies</a>
      <a
        href="javascript:void(0);"
        class="text-base w-fit p-2 rounded-lg"

        :class="{ activeClass: activeTab === 'beanies' }"
        @click="changeTab('beanies')"
      >Beanies</a>
      <a
        href="javascript:void(0);"
        class="text-base w-fit p-2 rounded-lg"

        :class="{ activeClass: activeTab === 'boots' }"
        @click="changeTab('boots')"
      >Boots</a>
      <a
        href="javascript:void(0);"
        class="text-base w-fit p-2 rounded-lg"

        :class="{ activeClass: activeTab === 'car' }"
        @click="changeTab('car')"
      >Car</a>
      <a
        href="javascript:void(0);"
        class="text-base w-fit p-2 rounded-lg"

        :class="{ activeClass: activeTab === 'gym' }"
        @click="changeTab('gym')"
      >Gym</a>
      <a
        href="javascript:void(0);"
        class="text-base w-fit p-2 rounded-lg"

        :class="{ activeClass: activeTab === 'head' }"
        @click="changeTab('head')"
      >Head Wears</a>
      <a
        href="javascript:void(0);"
        class="text-base"
        :class="{ activeClass: activeTab === 'jerseys' }"
        @click="changeTab('jerseys')"
      >Jerseys</a>
      <a
        href="javascript:void(0);"
        class="text-base w-fit p-2 rounded-lg"
      >Jumpsuits</a>
      <a
        href="javascript:void(0);"
        class="text-base w-fit p-2 rounded-lg"

        :class="{ activeClass: activeTab === 'clothing' }"
        @click="changeTab('clothing')"
      >Men's Clothings</a>
      <a
        href="javascript:void(0);"
        class="text-base w-fit p-2 rounded-lg"

        :class="{ activeClass: activeTab === 'hoodies' }"
        @click="changeTab('hoode')"
      >Hoodies</a>
      <a
        href="javascript:void(0);"
        class="text-base w-fit p-2 rounded-lg"

        :class="{ activeClass: activeTab === 'other' }"
        @click="
          changeTab('other')"
      >Other Categories</a>
    </div>
  </div>

  <!-- New JOb Offer Modal -->
  <!-- Open the modal using ID.showModal() method -->
  <button
    v-show="store.isEmployee"
    ref="popUp"
    class="absolute"
    onclick="my_modal_100.showModal()"
  />
  <dialog
    v-show="store.isEmployee"
    id="my_modal_100"
    class="modal"
  >
    <div class="modal-box text-black w-[400px]">
      <h3 class="font-bold text-center text-black text-xl satoshiM">
        Possible Job Offer
      </h3>
      <p class="py-4 text-center ">
        A client just reach out for a job
      </p>
      <div class=" border-2 p-5 mb-10 rounded-lg relative">
        <div class="absolute right-0 flex items-center gap-2">
          <a
            href="javascript:void(0);"
            class="archived p-2 bg-black rounded-full center "
          >
            <img
              :src="archivedTick"
              alt="favorite icon"
              class="w-5"
            >

          </a>
        </div>
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
      <button class="btn btn-neutral w-full text-white">
        Go To Chat
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

<style scoped>
.activeClass {
  @apply text-valmon_Gold bg-black
}
</style>
