<script setup>
// Images and Icons
import brandLogo from '@/assets/images/Logo/valmon.svg'
import magnifyLens from '@/assets/icons/magnifyingglass.svg'
import heart from '@/assets/icons/heart.svg'
import message from '@/assets/icons/message.svg'
import bell from '@/assets/icons/notification-bing.svg'
import nigeriaFlag from '@/assets/icons/nigeriaflag.svg'

/* --------------------- Handling The Currency Drop Down -------------------- */

// Opens and close the currency drop down
const dropDown = ref(false)

// show or hide the currency drop down
const showDropDown = () => {
  // call the toggle helper function
  toggle(dropDown)
}

// selecting currency
// data;
const currencies = [
  { id: 1, name: 'NGN', img: nigeriaFlag },
  { id: 2, name: 'EUR', img: 'king' },
]

// Currency Selection
const selectedCurrency = reactive({
  id: 1,
  name: 'NGN',
  img: nigeriaFlag,
})

const selectCurrency = (id) => {
  const selectedCurrencyData = currencies.find(currency => currency.id === id)
  // update the selectedCurrency Object
  selectedCurrency.id = selectedCurrencyData.id
  selectedCurrency.name = selectedCurrencyData.name
  selectedCurrency.img = selectedCurrencyData.img
  // call the toggle helper function
  toggle(dropDown)
}
</script>

<template>
  <nav class="bg-stone-950">
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
        <!-- Left side  -->
        <div
          class="flex items-center justify-end flex-1 space-x-4"
        >
          <!-- search input -->
          <div class="w-1/4 rounded-lg ring-1 ring-darkGold focus:outline-none focus:ring-2 focus:ring-darkGold bg-stone-900">
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
          </div>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
              <a
                href="#"
                class="rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white"
                aria-current="page"
              >Explore Skills</a>
              <a
                href="#"
                class="rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white"
              >MarketPlace</a>
            </div>
          </div>
          <button
            type="button"
            class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <img
              :src="heart"
              alt="heart icon"
            >
          </button>
          <button
            type="button"
            class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          >
            <img
              :src="message"
              alt="heart icon"
            >
          </button>
          <button
            type="button"
            class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            @click="selectCurrency(8)"
          >
            <img
              :src="bell"
              alt="heart icon"
            >
          </button>
          <div>
            <div
              class="relative"
            >
              <button
                type="button"
                class="relative w-[7.2rem] cursor-default rounded-md bg-inherit py-1.5 pl-1.5 pr-5 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-darkGold focus:outline-none focus:ring-2 focus:ring-darkGold sm:text-sm sm:leading-6"
                aria-haspopup="listbox"
                aria-expanded="true"
                aria-labelledby="listbox-label"
                @click="showDropDown()"
              >
                <span class="flex items-center">
                  <img
                    :src="selectedCurrency.img"
                    alt=""
                    class="h-6 w-6 flex-shrink-0 rounded-full"
                  >
                  <span class="ml-2 block truncate text-brightGold">{{ selectedCurrency.name }}</span>
                </span>
                <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                  <svg
                    class="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="#FFC400"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </button>

              <!-- Select popover, show/hide based on select state.   -->
              <ul
                v-show="dropDown"
                class=" absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                tabindex="-1"
                role="listbox"
                aria-labelledby="listbox-label"
                aria-activedescendant="listbox-option-3"
              >
                <!--
        Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation.

        Highlighted: "bg-indigo-600 text-white", Not Highlighted: "text-gray-900"
      -->
                <li
                  v-for="value in currencies"
                  id="listbox-option-0"
                  :key="value.id"
                  class="relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900"
                  role="option"
                  @click="selectCurrency(value.id)"
                >
                  <div class="flex items-center">
                    <img
                      :src="value.img"
                      alt=""
                      class="h-5 w-5 flex-shrink-0 rounded-full"
                    >
                    <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
                    <span class="ml-3 block truncate font-normal">{{ value.name }}</span>
                  </div>

                  <!--
          Checkmark, only display for selected option.

          Highlighted: "text-white", Not Highlighted: "text-indigo-600"
        -->
                  <span
                    v-if="value.id === selectedCurrency.id"
                    class="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600"
                  >
                    <svg
                      class="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                </li>

                <!-- More items... -->
              </ul>
            </div>
          </div>

          <!-- Profile dropdown -->
          <div class="relative ml-3">
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
