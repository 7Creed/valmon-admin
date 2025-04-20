<script setup>
// Images and Icons
import brandLogo from '@/assets/images/Logo/valmon.svg'
import magnifyLens from '@/assets/icons/magnifyingglass.svg'
</script>

<template>
  <nav class="bg-stone-950 w-full fixed z-[1000]">
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
        <NuxtLink
          to="/"
          class="flex items-center justify-center sm:items-stretch sm:justify-start"
        >
          <div class="flex flex-shrink-0 items-center">
            <img
              class="w-auto"
              :src="brandLogo"
              alt="Valmon Brand Logo"
            >
          </div>
        </NuxtLink>
        <!-- Left side  -->
        <div class="flex items-center justify-end flex-1 space-x-4">
          <!-- search input -->
          <!-- <div
            class="w-1/4 rounded-lg ring-1 ring-darkGold focus:outline-none focus:ring-2 focus:ring-darkGold bg-stone-900"
          >
            <label class="h-10 input input-bordered flex items-center gap-2 bg-inherit search">
              <img
                :src="magnifyLens"
                alt="magnifying Lens"
              >
              <input
                type="text"
                class="text-sm text-[#FFFFFF80]"
                placeholder="Search For Services"
              >
            </label>
          </div> -->
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
              <NuxtLink to="/home"
                class="rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white"
                aria-current="page"
              >Explore Skills</NuxtLink>
              <NuxtLink
                to="/marketplace"
                class="rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white"
              >MarketPlace</NuxtLink>
              <NuxtLink
                to="/login"
                class="rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white"
              >Sign
                In</NuxtLink>
            </div>
          </div>
          <NuxtLink to="/getstarted">
            <button class="btn btn-outline bg-inherit text-white">
            Join Now
          </button>
          </NuxtLink>
         
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
