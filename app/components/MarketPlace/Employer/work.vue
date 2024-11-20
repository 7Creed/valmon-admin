<script setup>
// Icons
import heart from '@/assets/icons/heart-circle.svg'
import send from '@/assets/icons/send-2.svg'
import copySuccess from '@/assets/icons/copy-success.svg'
import location from '@/assets/icons/location.svg'

import { accountController } from '~/services/modules/account'

import { useActiveView } from '@/composables/state'
import { useGlobalStore } from '@/store'

const { handleGeneralHistory } = useActiveView()
const store = useGlobalStore()
const workerTab = ref('profile')
const toggleTab = (tab) => {
  workerTab.value = tab
}

const viewAll = (tab) => {
  console.log(tab)
  workerTab.value = tab
}

const History = () => {
  handleGeneralHistory()
  navigateTo('/home')
}

const { SingleUserAccount, singleGallery, singleListingCategory } = accountController()

// Account
const loading = ref(false)
const userInfo = ref({})
const gigs = ref([])
// Listings

const listingLoader = ref(false)
const allListing = ref([])

// Gallery
const galleryLoader = ref(false)
const allGallery = ref([])

/**
 * Fetches data for a given ID and updates the UI accordingly.
 *
 * @param {Function} func - The function to call for fetching data.
 * @param {String} id - The ID to fetch data for.
 * @param {Ref} loader - Optional. A reference to a loader state.
 * @param {Boolean} alert - Optional. Whether to show alerts or not.
 */
const FetchID = async (func, id, loader = null, alert = true) => {
  // Set loader to true if provided
  if (loader) loader.value = true

  // Call the function with the provided ID and await the result
  const { status, data, error } = await func(id)

  // Handle success case
  if (status.value === 'success') {
    console.log(func.name, data.value.data) // Log the fetched data for debugging purposes
    if (alert) handleALert('success', data.value.message) // Show success alert if alert is true
    // Update the individual details to a variable based on the function name
    switch (func.name) {
      case 'SingleUserAccount':
        userInfo.value = data.value.data // Update userInfo with the fetched data
        gigs.value = data.value.data.profile.gigs
        break
      case 'singleGallery':
        allGallery.value = data.value.data // Update userInfo with the fetched data
        break
      default:
        break // Handle other cases if needed
    }
  }
  // Handle error case
  if (status.value === 'error') {
    if (alert) handleALert('error', error.value.data.message) // Show error alert if alert is true
  }
  // Reset loader to false after the operation
  if (loader) loader.value = false
}

// Fetch single User Account
FetchID(SingleUserAccount, store.userIdForProfileCheck, loading)

// Handle User Location
const userLocation = (address) => {
  if (address === null || address === undefined) return 'NA'
  const userAddress = JSON.parse(address)
  return userAddress[0]
}

// Fetch single User Gallery
FetchID(singleGallery, store.userIdForProfileCheck, galleryLoader)
// onMounted(() => {
//   store.viewProfileFromDashboard = false
// })

const selectedServiceId = ref(null)
const selectServices = (id) => {
  console.log(id)
  selectedServiceId.value = id
  console.log(selectedServiceId.value)
}

const openChat = () => {
  store.updateNewConversationDetails({
    recipient_id: store.userIdForProfileCheck,
    service_id: selectedServiceId,
  })
  navigateTo('/chat')
}
</script>

<template>
  <div
    class="flex gap-8 pb-20 px-20 relative"
    :class="{ 'flex-col': store.UserAccount?.role === 'Admin' }"
  >
    <NuxtLink
      v-if="store.viewProfileFromDashboard "
      to="/user"
    >
      <BaseBackButton class="absolute top-15 left-[-10px]" />
    </NuxtLink>
    <!-- Dashboard view -->
    <template v-if="store.viewProfileFromDashboard">
      <aside class="">
        <div class="card card-compact bg-base-100 w-3/5 shadow-xl">
          <div class="card-body flex-row gap-20">
            <div class="flex flex-col flex-1">
              <div class="flex justify-between">
                <!-- Header -->
                <div class="flex items-center gap-6 mb-2 flex-1">
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
                <!-- 3rd -->
                <div class="flex-1">
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
                    <span
                      v-if="userInfo.account_status === 'ACTIVE'"
                      class="text-sm font-bold text-green-500"
                    >Online</span>
                    <span
                      v-if="!userInfo.account_status === 'ACTIVE'"
                      class="text-sm font-bold text-green-500"
                    >Offline</span>
                  </div>
                </div>
              </div>
              <!-- contact -->
              <div>
                <div class="card-actions justify-between gap-4">
                  <button
                    class="btn btn-outline flex-1 rounded-2xl border-gray-300 border-2"
                  >
                    Contact
                  </button>
                  <button
                    class="btn bg-[#FF9F12CC]  flex-1 rounded-2xl border-[#FF9F12CC] border-2"
                  >
                    Suspend
                  </button>
                  <button
                    class="btn bg-red-600 flex-1 text-white rounded-2xl border-red-600 border-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
            <div class="alert mb-2 block flex-1">
              <h3 class="font-bold mb-2">
                About Me
              </h3>
              <p class="text-xs">
                As an expert with over 20 years of experience, I've seen
                remarkable advancements in technology, making it more accessible
                and beneficial for everyday use.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </template>
    <!-- General View -->
    <template v-if="!store.viewProfileFromDashboard">
      <aside class="">
        <div class="card card-compact bg-base-100 w-72 shadow-xl">
          <div class="card-body">
            <div class="card-header mb-1 flex items-center justify-between">
              <a
                href="javascript:void(0)"
                class="w-fit bg-gray-400 p-1 center rounded-full"
                @click="History"
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
                  <img :src="userInfo.profile_pic">
                </div>
              </div>
              <!-- Profile desc -->
              <div class="w-full">
                <h3 class="mb-1 text-[#24242A] font-semibold text-sm">
                  {{ userInfo.first_name }} {{ userInfo.last_name }}
                </h3>
                <div class="flex items-center flex-wrap gap-2 my-2">
                  <div
                    v-for="(service, index) in userInfo.profile?.services"
                    :key="index"
                    class="text-xs py-1 px-2 bg-gray-200 tag rounded-sm  w-fit "
                  >
                    <span

                      class=" text-black"
                    >{{ service.service.name }}</span>
                  </div>
                </div>
                <div class="flex items-center gap-2 ">
                  <div
                    v-for="(rate, index) in userInfo.ratings"
                    :key="index"
                    class="rating w-4"
                  >
                    <input
                      type="radio"
                      name="rating-1"
                      class="mask mask-star"
                    >
                  </div>
                  <span class="text-xs font-bold">{{ userInfo.rating }}</span>
                  <span class="text-black text-xs">({{ userInfo.ratings_count }} Ratings)</span>
                </div>
              </div>
            </div>
            <!-- body -->

            <div class="alert mb-2 block">
              <h3 class="font-bold mb-2">
                About Me
              </h3>
              <p class="text-xs">
                {{ userInfo?.profile?.bio ?? 'Nil' }}
              </p>
            </div>
            <div
              class="flex justify-between items-center text-[#404145] text-xs mb-1"
            >
              <span class="font-medium">Inbox response time</span>
              <span class="font-bold">{{ userInfo.inbox_response_time }} Mins</span>
            </div>
            <div
              class="flex justify-between items-center text-[#404145] text-xs mb-1"
            >
              <span class="font-medium">Inbox response rate</span>
              <span class="font-bold">{{ userInfo.inbox_response_rate }} %</span>
            </div>
            <div
              class="flex gap-2 items-center text-[#62646A] text-xs w-1/2 mb-1"
            >
              <img
                :src="location"
                alt="Location icon"
                class="h-5"
              >
              <span class="font-medium text-[rgba(0,0,0,1)]">{{ userLocation(userInfo?.profile?.addresses).city }}, {{ userLocation(userInfo?.profile?.addresses).country }}</span>
            </div>
            <div class="flex gap-2 items-center text-[#62646A] text-xs mb-1">
              <img
                :src="copySuccess"
                alt="copy-success icon"
                class="h-5"
              >
              <span class="text-[rgba(0,0,0,1)] font-medium">0 jobs Completed</span>
            </div>
            <!-- Online Presence -->
            <div class="relative flex gap-2">
              <span>
                <span v-if="store.userOnline">
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
                </span>
                <span v-else>
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
                      fill="#FF0000 "
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
                      fill="#FF0000 "
                    />
                  </svg>
                </span>
              </span>
              <span
                class="text-sm font-bold text-green-500"
                v-text="store.userOnline ? 'Online' : 'Offline'"
              />
            </div>

            <!-- Footer -->
            <div class="card-actions justify-between gap-4">
              <button
                class="btn btn-outline flex-1 rounded-2xl border-gray-300 border-2"
                onclick="my_modal_1.showModal()"
              >
                Contact
              </button>
            </div>
          </div>
        </div>
      </aside>
    </template>
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
        >Gigs</a>
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
      <MarketPlaceEmployerBriefProfile
        v-if="workerTab === 'profile'"
        :-user-gallery="allGallery"
        type="profile"
        :gigs="gigs"
        @open-tab="viewAll"
      />
      <MarketPlaceEmployerWorkGallery
        v-if="workerTab === 'gallery'"
        :profile-gallery="allGallery"
        type="profile"
      />
      <MarketPlaceEmployerServices
        v-if="workerTab === 'service'"
        type="profile"
        :gigs="gigs"
      />
      <MarketPlaceEmployerReviews v-if="workerTab === 'review'" />
      <MarketPlaceEmployerMarketListing v-if="workerTab === 'marketplace'" />
    </section>
  </div>

  <!-- Open the modal using ID.showModal() method -->
  <!-- Add Category -->
  <dialog
    id="my_modal_1"
    class="modal"
  >
    <div class="modal-box">
      <h3 class="text-3xl font-bold text-[rgba(35, 35, 35, 1)] mb-4">
        Select Service Type
      </h3>
      <p class="mb-8 font-medium text-[rgba(36, 36, 36, 1)]">
        Select service type to contact this skilled worker for
      </p>
      <div
        v-for="(service, index) in userInfo.profile?.services"
        :key="index"
        class="p-3 border rounded-md btn-block mb-5 bg-white border-gray-500"
      >
        <span class="flex flex-row justify-between w-full">

          <input
            type="radio"
            name="radio-1"
            class="radio"
            @change="selectServices(service.service.id)"
          >
          <span class="text-[rgba(105, 102, 113, 1)] text-sm font-bold">{{ service.service.name }}</span>
          <span class="text-[rgba(105, 102, 113, 1)] text-sm font-medium">Year of experience {{ service.years_of_experience }}</span>

        </span>
      </div>
      <BaseButton
        title="Continue"
        color="rgba(33, 31, 31, 1)"
        text-color="rgba(255, 255, 255, 1)"
        :outline="false"
        class="block w-full"
        @click="openChat()"
              />
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

<style>
.border_b {
  @apply border-b-darkGold pb-1 !important;
}
</style>
