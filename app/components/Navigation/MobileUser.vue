<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useGlobalStore } from '~/store'
import { NotificationsController } from '~/services/modules/notificatons'

import bell from '@/assets/icons/notification-bing.svg'

const { getUnreadNotifications } = NotificationsController()

const store = useGlobalStore()
const showMenu = ref(false)

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const closeMenu = (event) => {
  if (event.target.classList.contains('overlay')) {
    showMenu.value = false
  }
}

// Watch for menu visibility and toggle `no-scroll` class on <body>
watch(showMenu, (isVisible) => {
  if (isVisible) {
    document.body.style.overflow = 'hidden' // Disable scrolling
  }
  else {
    document.body.style.overflow = '' // Re-enable scrolling
  }
})

onMounted(() => {
  document.addEventListener('click', closeMenu)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', closeMenu)
  document.body.style.overflow = '' // Ensure scrolling is re-enabled on unmount
})

// Logout
const token = useCookie('token')

const logOut = async () => {
  token.value.token = null
  token.value.type = null

  store.$patch({
    UserAccount: null,
  })

  await navigateTo('/login')
}

/* -------------------------- Handles Notification -------------------------- */
const toggleNotification = async () => {
  // call the toggle helper function
  // toggle(notification)
  await navigateTo('/notifications')
}

const UnreadNotifications = ref([])

const fetchNotifications = async () => {
  console.log('Fetching notifications...')
  try {
    const { status, data } = await getUnreadNotifications()
    if (status.value === 'success') {
      console.log('Unread notifications', data.value.data)
      UnreadNotifications.value = data.value.data
    }
  }
  catch (error) {
    console.error('Error fetching notifications:', error)
  }
}

const newNotificationAlert = ref(false)
watch(UnreadNotifications, (newVal, oldVal) => {
  if (newVal.length > 0) {
    newNotificationAlert.value = true
  }
})

// Fetch Notifications when user is logged in
if (store?.UserAccount?.id) {
  setInterval(fetchNotifications, 30000)
}
else {
  clearInterval(fetchNotifications)
}

onMounted(fetchNotifications)
</script>

<template>
  <div class="mobile-navbar bg-black fixed top-0 left-0 right-0 z-[10000]">
    <div
      v-if="!showMenu"
      class="navbar bg-black"
    >
      <div class="navbar-start">
        <div
          class="dropdown"
          @click="toggleMenu"
        >
          <img
            src="../../assets//images/UIElements/menu.svg"
            alt=""
            class="w-[30px]"
          >
        </div>
      </div>
      <div class="navbar-center">
        <img
          src="../../assets/images/Logo/valmon.svg"
          alt=""
          class="w-[40px]"
        >
      </div>
      <div class="navbar-end">
        <div class="flex justify-center items-baseline gap-5 ">
          <button
            type="button"
            class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            @click="toggleNotification"
          >
            <img
              :src="bell"
              alt="heart icon"
            >
            <span
              v-if="newNotificationAlert"
              class="bg-red-600 absolute top-0 right-0 w-2 h-2 transform translate-x-1/2 -translate-y-1/2 rounded-full"
              aria-hidden="true"
            />
          </button>

          <NuxtLink
            v-if="store?.UserAccount?.id"
            to="/profilesetting"
          >
            <div class="avatar">
              <div class="ring-[1.5px] ring-brightGold w-8 rounded-full">
                <img
                  :src="store?.UserAccount?.profile_pic"
                  alt="Profile Pic"
                >
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div
        v-show="showMenu"
        class="fixed inset-0 bg-black bg-opacity-50 z-[1000] overlay transition-opacity duration-300 ease-in-out"
      >
        <div
          class="w-4/5 bg-[#151212] h-full p-8 text-lg transform transition-transform duration-300 ease-in-out"
          @click.stop
        >
          <img
            src="../../assets/images/Logo/valmon.svg"
            alt=""
            class="w-2/6 mb-10"
          >

          <NuxtLink
            v-if="store?.UserAccount?.id"
            to="/profilesetting"
            class="flex items-center gap-6 w-full bg-[#C09742] border border-[#C09742] text-white font-semibold text-lg rounded-md py-2 px-4 mb-7"
          >
            <div class="avatar">
              <div class="ring ring-offset-base-100 w-12 rounded-full">
                <img
                  :src="store?.UserAccount?.profile_pic"
                  alt="Profile Pic"
                >
              </div>
            </div>
            <span class="text-base">My Profile</span>
          </NuxtLink>

          <div class="flex flex-col">
            <NuxtLink
              to="/home"
              class="text-white font-semibold"
            >
              Explore Skills
            </NuxtLink>
            <div class="divider h-[1px] bg-gray-500" />
            <NuxtLink
              to="/marketplace"
              class="text-white font-semibold"
            >
              Marketplace
            </NuxtLink>
            <div class="divider h-[1px] bg-gray-500" />
            <NuxtLink
              v-if="store?.UserAccount?.id"
              to="javascript:void(0);"
              class="text-white font-semibold"
            >
              Favourites
            </NuxtLink>
            <div
              v-if="store?.UserAccount?.id"
              class="divider h-[1px] bg-gray-500"
            />
            <NuxtLink
              v-if="store?.UserAccount?.id"
              to="/chat"
              class="text-white font-semibold"
            >
              Messages
            </NuxtLink>
            <div
              v-if="store?.UserAccount?.id"
              class="divider h-[1px] bg-gray-500"
            />
            <NuxtLink
              v-if="store?.UserAccount?.id"
              to="/notifications"
              class="text-white font-semibold"
            >
              Notifications
            </NuxtLink>
            <div
              v-if="store?.UserAccount?.id"
              class="divider h-[1px] bg-gray-500"
            />
            <NuxtLink
              v-if="!store?.UserAccount?.id"
              to="/login"
              class="text-white font-semibold"
            >
              Sign In
            </NuxtLink>
            <div
              v-if="!store?.UserAccount?.id"
              class="divider h-[1px] bg-gray-500"
            />
            <NuxtLink
              v-if="!store?.UserAccount?.id"
              to="/getstarted"
            >
              <button class="btn btn-outline bg-inherit text-white">
                Join Now
              </button>
            </NuxtLink>

            <NuxtLink
              v-if="store?.UserAccount?.id"
              class="text-white font-semibold cursor-pointer"
              @click="logOut"
            >
              Logout
            </NuxtLink>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.no-scroll {
  overflow: hidden;
  height: 100vh;
}
</style>
