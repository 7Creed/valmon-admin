<script setup>
// Images and Icons
import brandLogo from '@/assets/images/Logo/valmon.svg'
import bell from '@/assets/icons/notification-bing.svg'

import { useGlobalStore } from '@/store'

// Initialize Variables
const store = useGlobalStore()

// Handles Notification
const notification = ref(false)
const toggleNotification = () => {
  // call the toggle helper function
  toggle(notification)
}

// Show New Job Offer Modal
// const popUp = ref(null)
// onMounted(() => {
//   setTimeout(() => {
//     if (popUp.value && store.isEmployee) {
//       popUp.value.click()
//     }
//   }, 1000)
// })
</script>

<template>
  <nav
    class="bg-stone-950 fixed w-full z-[1000]"
  >
    <div class="mx-auto max-w-full px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-20 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button -->
          <button
            type="button"
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
            <!--
            Icon when menu is closed.

            Menu open: "hidden", Menu closed: "block"
          -->
            <svg
              class="block h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <!--
            Icon when menu is open.

            Menu open: "block", Menu closed: "hidden"
          -->
            <svg
              class="hidden h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div
          class="flex items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="flex flex-shrink-0 items-center">
            <img
              class="w-auto"
              :src="brandLogo"
              alt="Valmon Brand Logo"
            >
          </div>
        </div>
        <span class="text-white ms-10 font-bold">Summary</span>
        <!-- Left side  -->
        <div
          class="flex items-center justify-end flex-1 space-x-4"
        >
          <div class="relative">
            <button
              type="button"
              class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              @click="toggleNotification"
            >
              <img
                :src="bell"
                alt="heart icon"
              >
            </button>
          </div>

          <!-- Profile dropdown -->
          <RouterLink to="profilesetting">
            <div
              class="relative ml-3"
            >
              <div>
                <button
                  id="user-menu-button"
                  type="button"
                  class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <img
                    class="h-8 w-8 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  >
                </button>
              </div>
            </div>
          </RouterLink>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-1">
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
              <span
                class="rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white"
                aria-current="page"
              >Favour Udoh</span>
              <span class="font-normal rounded-3xl bg-[#E1CD7182] pt-2 px-4 text-white">Super Admin</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
  </nav>
</template>

<style>
nav {
  font-family: satoshiB;
}
</style>
