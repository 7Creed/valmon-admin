<script setup>
// Icons
import heart from '@/assets/icons/heart-circle.svg'
import send from '@/assets/icons/send-2.svg'
import copySuccess from '@/assets/icons/copy-success.svg'
import location from '@/assets/icons/location.svg'

import { accountController } from '~/services/modules/account'
import { UsersController } from '~/services/modules/Admin/users'

import { useActiveView } from '@/composables/state'
import { useGlobalStore } from '@/store'

const { users, deleteUser, suspendUser, restoreUser } = UsersController()

const { handleGeneralHistory, state } = useActiveView()
const store = useGlobalStore()
const workerTab = ref('profile')
const toggleTab = (tab) => {
  workerTab.value = tab
}

const viewAll = (tab) => {
  console.log(tab)
  workerTab.value = tab
}

onMounted(() => {
  if (store.marketPlaceTab) {
    workerTab.value = 'marketplace'
  }
})
const History = () => {
  handleGeneralHistory()
  navigateTo('/home')
}

const { SingleUserAccount, singleGallery } = accountController()

// Account
const loading = ref(false)
const userInfo = ref({})
const gigs = ref([])
const adminUsers = ref({})
const reviews = ref([])

// Listings
const MPListing = ref([])
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

// Handle User Location
const userLocation = (address) => {
  if (address === null || address === undefined) return 'NA'
  const userAddress = JSON.parse(address)
  return userAddress[0]
}

const fetchUsers = async (id) => {
  try {
    const { status, data, error } = await users(id)
    if (status.value === 'success') {
      adminUsers.value = data.value.data
      allGallery.value = data.value.data.gallery
      gigs.value = data.value.data.profile.gigs
      reviews.value = data.value.data.reviews
      MPListing.value = data.value.data.listings
    }
    if (status.value === 'error') {
      console.log(error.value)
    }
  }
  catch (error) {
    console.log(error)
  }
}

const removeUser = async (id) => {
  const { data, error, status } = await deleteUser(id)

  if (status.value === 'success') {
    handleALert('success', data.value.message)
    navigateTo('/admin/user')
  }
  else if (status.value === 'error') {
    console.error('Delete User failed:', error.value.data.message)
  }
}
// Fetch single User Gallery
if (store.UserAccount?.role == 'Admin' || store.UserAccount?.role == 'super_admin') {
  console.log('dashbord profile')
  fetchUsers(store.adminUserId)
}
else {
  // Fetch single User Account and gallery
  FetchID(singleGallery, store.userIdForProfileCheck, galleryLoader)
  FetchID(SingleUserAccount, store.userIdForProfileCheck, loading)
}

const selectedServiceId = ref(null)
const selectedService = ref('')
const selectServices = (id, name) => {
  selectedServiceId.value = id
  selectedService.value = name
}

const openChat = () => {
  store.updateNewConversationDetails(store.userIdForProfileCheck, selectedServiceId.value)
  store.newConversationDetails.gig = null
  navigateTo('/chat')
}

const openChatForListing = () => {
  store.updateNewConversationDetails(store.userIdForProfileCheck, null, store.listingId)
  store.newConversationDetails.gig = null
  navigateTo('/chat')
}
const isOnline = ref(false)

const deriveLastSeenAt = (lastSeenAt) => {
  if (!lastSeenAt) return
  const lastSeen = new Date(lastSeenAt)
  const now = new Date()
  const diffInMinutes = (now - lastSeen) / (1000 * 60)
  isOnline.value = diffInMinutes >= 30
}

watch(userInfo, (newVal, oldVal) => {
  if (newVal) {
    deriveLastSeenAt(newVal.last_seen_at)
  }
})

// User Online Presence

const userStatus = ref('') // Holds the user's status

const PingUser = async () => {
  console.log('Pinging user...')
  const { data, error, status } = await ping()

  if (status.value === 'success') {
    userStatus.value = 'Online' // Update status to online
    console.log('Ping successful:', data.value)
  }
  else if (status.value === 'error') {
    userStatus.value = 'Offline' // Update status to offline
    console.error('Ping failed:', error.value.data.message)
  }
}

let interval

// onMounted(() => {
//   PingUser() // Initial call
//   interval = setInterval(PingUser, 30000) // Ping every 30 seconds
// })

// onUnmounted(() => {
//   clearInterval(interval) // Clean up
// })

const computedReviews = reactive({
  average: 0,
  data: [],
  ratings: {},
  total: 0,
})

watch(reviews, (newVal, oldVal) => {
  if (newVal) {
    const totalRatings = newVal.reduce((acc, review) => acc + review.rating, 0)
    const average = totalRatings / newVal.length
    computedReviews.average = average.toFixed(1)

    const Ratings = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    }
    newVal.forEach((review) => {
      Ratings[review.rating]++
    })
    computedReviews.data = newVal
    computedReviews.ratings = Ratings
  }
})

const manageUser = async (id, status) => {
  if (status == 'ACTIVE') {
    suspend(id)
  }
  else {
    restore(id)
  }
  console.log(status)
}

const suspend = async (id) => {
  const { data, error, status } = await suspendUser(id)

  if (status.value === 'success') {
    handleALert('success', data.value.message)
    fetchUsers(id)
  }
  else if (status.value === 'error') {
    console.error('Delete User failed:', error.value)
  }
}

const restore = async (id) => {
  const { data, error, status } = await restoreUser(id)

  if (status.value === 'success') {
    handleALert('success', data.value.message)
    fetchUsers(id)
  }
  else if (status.value === 'error') {
    console.error('Delete User failed:', error.value.data.message)
  }
}
</script>

<template>
  <div
    class="flex flex-col  lg:flex-row gap-8 pb-20 xxl:px-20 relative"
    :class="{ 'flex-col': store.UserAccount?.role === 'Admin' || store.UserAccount?.role === 'super_admin' }"
  >
    <NuxtLink
      v-if="store.UserAccount?.role === 'Admin' || store.UserAccount?.role === 'super_admin'"
      to="/user"
    >
      <BaseBackButton class="absolute top-15 left-[-10px]" />
    </NuxtLink>
    <!-- Dashboard view -->
    <template v-if="store.UserAccount?.role === 'Admin' || store.UserAccount?.role === 'super_admin'">
      <aside class="">
        <div class="card card-compact bg-base-100 w-3/5 shadow-xl">
          <div class="card-body flex-row gap-20">
            <div class="flex flex-col flex-1">
              <div class="flex justify-between">
                <!-- Header -->
                <div class="flex items-center gap-6 mb-2 flex-1">
                  <!-- avatar -->
                  <div class="avatar">
                    <div class="ring-darkGold ring-offset-base-100 w-12 rounded-full ring ring-offset-2">
                      <img :src="adminUsers.profile_pic">
                    </div>
                  </div>
                  <!-- Profile desc -->
                  <div>
                    <h3 class="mb-1 text-[#24242] font-semibold text-sm">
                      {{ adminUsers.first_name }} {{ adminUsers.last_name }}
                    </h3>
                    <div class="text-xs py-1 px-2 bg-gray-200 tag rounded-sm mb-2">
                      <span class="t#62646Aext-black">{{ adminUsers?.profile?.services[0]?.service?.name }}</span>
                    </div>
                    <div class="flex items-center gap-2">
                      <div class="rating w-4">
                        <input
                          type="radio"
                          name="rating-1"
                          class="mask mask-star"
                        >
                      </div>
                      <span class="text-xs font-bold">{{ adminUsers?.rating }}</span>
                      <span class="text-black text-xs">({{ adminUsers.ratings_count }} Ratings)</span>
                    </div>
                  </div>
                </div>
                <!-- 3rd -->
                <div class="flex-1">
                  <div class="flex gap-2 items-center text-[#62646A] text-xs w-1/2 mb-1">
                    <img
                      :src="location"
                      alt="Location icon"
                      class="h-5"
                    >
                    <span class="font-medium text-[rgba(0,0,0,1)]">{{ userLocation(adminUsers?.profile?.addresses).city
                    }}, {{ userLocation(adminUsers?.profile?.addresses).country }}</span>
                  </div>
                  <div class="flex gap-2 items-center text-[#62646A] text-xs mb-1">
                    <img
                      :src="copySuccess"
                      alt="copy-success icon"
                      class="h-5"
                    >
                    <span class="text-[rgba(0,0,0,1)] font-medium">{{ adminUsers.active_jobs_count }} jobs
                      Completed</span>
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
                  <button class="btn btn-outline flex-1 rounded-2xl border-gray-300 border-2">
                    Contact
                  </button>
                  <button
                    class="btn bg-[#FF9F12CC]  flex-1 rounded-2xl border-[#FF9F12CC] border-2"
                    @click="manageUser(adminUsers.id, adminUsers?.account_status)"
                  >
                    {{ adminUsers?.account_status === 'ACTIVE' ? 'Deactivate' : 'Activate' }}
                  </button>
                  <button
                    class="btn bg-red-600 flex-1 text-white rounded-2xl border-red-600 border-2"
                    @click="removeUser(adminUsers.id)"
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
                {{ adminUsers?.profile?.bio ?? 'N/A' }}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </template>
    <!-- General View -->
    <template v-if="!(store.UserAccount?.role === 'Admin' || store.UserAccount?.role === 'super_admin')">
      <aside class="">
        <div class="card card-compact bg-base-100 sm:w-3/4 lg:w-72 shadow-xl mx-auto">
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
                <div class="ring-darkGold ring-offset-base-100 w-12 rounded-full ring ring-offset-2">
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
                    <span class=" text-black">{{ service.service.name }}</span>
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

            <div class=" alert  mb-2 block">
              <h3 class="font-bold mb-2">
                About Me
              </h3>
              <p class="text-xs">
                {{ userInfo?.profile?.bio ?? 'Nil' }}
              </p>
            </div>
            <div class="flex justify-between items-center text-[#404145] text-xs mb-1">
              <span class="font-medium">Inbox response time</span>
              <span class="font-bold">{{ userInfo.inbox_response_time }} Mins</span>
            </div>
            <div class="flex justify-between items-center text-[#404145] text-xs mb-1">
              <span class="font-medium">Inbox response rate</span>
              <span class="font-bold">{{ userInfo.inbox_response_rate }} %</span>
            </div>
            <div class="flex gap-2 items-center text-[#62646A] text-xs w-1/2 mb-1">
              <img
                :src="location"
                alt="Location icon"
                class="h-5"
              >
              <span class="font-medium text-[rgba(0,0,0,1)]">{{ userLocation(userInfo?.profile?.addresses).city }}, {{
                userLocation(userInfo?.profile?.addresses).country }}</span>
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
                <template v-if="isOnline">
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
                </template>
                <template v-else>
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
                </template>
              </span>
              <span
                class="text-sm font-bold"
                :class="isOnline ? 'text-green-500' : 'text-red-500'"
                v-text="isOnline ? 'Online' : 'Offline'"
              />
            </div>

            <!-- Footer -->
            <div class="card-actions justify-between gap-4">
              <button
                v-if="!store.marketPlaceTab"
                onclick="my_modal_1.showModal()"
                class="btn btn-outline flex-1 rounded-2xl border-gray-300 border-2"
              >
                Contact
              </button>

              <!-- for listings -->
              <button
                v-else
                class="btn btn-outline flex-1 rounded-2xl border-gray-300 border-2"
                @click="openChatForListing"
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
      <div class="flex  bg-white p-3 rounded-xl lg:w-3/4 xl:w-1/2 items-center gap-4 sm:gap-0 justify-center sm:justify-evenly mb-6 ">
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
          :class="{ border_b: workerTab === 'marketplace' } "
          @click="toggleTab('marketplace')"
        >Marketplace Listings </a>
      </div>
      <!-- Content -->
      <MarketPlaceEmployerBriefProfile
        v-if="workerTab === 'profile'"
        :UserGallery="allGallery"
        type="profile"
        :gigs="gigs"
        :reviews="computedReviews"
        @open-tab="viewAll"
      />
      <MarketPlaceEmployerWorkGallery
        v-if="workerTab === 'gallery'"
        :profile-gallery="allGallery"
        type="profile"
        class="mx-auto"
      />
      <MarketPlaceEmployerServices
        v-if="workerTab === 'service'"
        type="profile"
        :gigs="gigs"
      />
      <MarketPlaceEmployerReviews
        v-if="workerTab === 'review'"
        :reviews="computedReviews"
      />
      <MarketPlaceEmployerMarketListing
        v-if="workerTab === 'marketplace'"
        :listing="MPListing"
      />
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
            @change="selectServices(service.service.id, service.service.name)"
          >
          <span class="text-[rgba(105, 102, 113, 1)] text-sm font-bold">{{ service.service.name }}</span>
          <span class="text-[rgba(105, 102, 113, 1)] text-sm font-medium">Year of experience {{
            service.years_of_experience }}</span>

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
.alert {
  text-align: start !important;
  justify-items: flex-start !important;
}
</style>
