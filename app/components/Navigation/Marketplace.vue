<script setup>
// Images and Icons
import brandLogo from '@/assets/images/Logo/valmon.svg'
import magnifyLens from '@/assets/icons/magnifyingglass.svg'
import heart from '@/assets/icons/heart.svg'
import message from '@/assets/icons/message.svg'
import bell from '@/assets/icons/notification-bing.svg'

import { useGlobalStore } from '@/store'
import { NotificationsController } from '~/services/modules/notificatons'
import { MiscController } from '~/services/modules/misc'

// Initialize Variables
const store = useGlobalStore()
const { getCurrencies } = MiscController()
const { getUnreadNotifications } = NotificationsController()

/* --------------------- Handles The Currency Drop Down -------------------- */

// Opens and close the currency drop down
const dropDown = ref(false)

// show or hide the currency drop down
const showDropDown = () => {
  // call the toggle helper function
  toggle(dropDown)
}

// selecting currency
// data;
const currencies = ref([])

// Currency Selection
const selectedCurrency = reactive({
  code: '',
  id: null,
})

watch(selectedCurrency, (newVal) => {
  if (newVal) {
    store.selectedCurrency = newVal.code
  }
})

const selectCurrency = (id) => {
  const selectedCurrencyData = currencies.value.find(currency => currency.id === id)
  // update the selectedCurrency Object
  selectedCurrency.id = selectedCurrencyData.id
  selectedCurrency.code = selectedCurrencyData.code
  // call the toggle helper function
  toggle(dropDown)
}

const fetchCurrencies = async () => {
  const { data, status, error } = await getCurrencies()
  if (status.value === 'success') {
    data.value.data.forEach((element) => {
      const { id, code } = element
      currencies.value.push({
        id,
        code,
      })
    })
    selectedCurrency.code = data.value.data[0].code
    selectedCurrency.id = data.value.data[0].id
  }
  if (status.value === 'error') {
    console.log(error.value)
  }
}
fetchCurrencies()
// Handles Notification
const notification = ref(false)
const toggleNotification = async () => {
  // call the toggle helper function
  // toggle(notification)
  await navigateTo('/notifications')
}

// Show New Job Offer Modal
// const popUp = ref(null)
// onMounted(() => {
//   setTimeout(() => {
//     if (popUp.value && store.UserAccount.account_type == 'worker') {
//       popUp.value.click()
//     }
//   }, 1000)
// })

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
  <nav
    class="bg-stone-950 fixed w-full z-[1000] hidden lg:block"
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
          <a
            href="/"
            class="flex flex-shrink-0 items-center"
          >
            <img
              class="w-auto"
              :src="brandLogo"
              alt="Valmon Brand Logo"
            >
          </a>
        </div>
        <!-- Left side  -->
        <div
          class="flex items-center justify-end flex-1 space-x-4"
        >
          <!-- search input -->
          <div class="hidden w-1/4 rounded-lg ring-1 ring-darkGold focus:outline-none focus:ring-2 focus:ring-darkGold bg-stone-900">
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
              <NuxtLink
                to="/home"
                href="#"
                class="rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white"
                aria-current="page"
              >Explore Skills</NuxtLink>
              <NuxtLink
                to="/marketplace"
                class="rounded-md px-3 py-2 text-base font-medium text-white hover:bg-gray-700 hover:text-white"
              >
                MarketPlace
              </NuxtLink>
            </div>
          </div>
          <NuxtLink to="favorites">
            <button

              type="button"
              class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <img
                :src="heart"
                alt="heart icon"
              >
            </button>
          </NuxtLink>
          <NuxtLink to="chat">
            <button

              type="button"
              class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <img
                :src="message"
                alt="heart icon"
              >
            </button>
          </NuxtLink>

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
              <span
                v-if="newNotificationAlert"
                class="bg-red-600 absolute top-0 right-0 w-2 h-2 transform translate-x-1/2 -translate-y-1/2 rounded-full"
                aria-hidden="true"
              />
            </button>
            <!-- Notification drop down -->
            <div
              v-if="notification"
              class="hidden p-4 bg-white rounded-md absolute z-50 w-96 right-[-150px] top-11 border-b-brightGold border-b-2"
            >
              <div class="flex justify-between items-center mb-3">
                <h3 class="text-sm font-semibold text-black">
                  Notification
                </h3>
                <a
                  href="javascript:void(0);"
                  class="text-sm font-semibold text-red-600"
                >Clear</a>
              </div>
              <div
                v-for="notification in UnreadNotifications.slice(0, 6)"
                :key="notification.id"
                role="alert"
                class="alert mb-3"
                @click="OpenNotification"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  class="stroke-info h-6 w-6 shrink-0"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span class="text-sm"> {{ notification.data.title }} </span>
                <a
                  href="Javascript:void(0)"
                  class="text-sm font-semibold text-red-600"
                ><i>tap to see</i></a>
              </div>
            </div>
          </div>

          <div>
            <div

              class="relative"
            >
              <button
                type="button"
                class=" relative w-[5rem] cursor-default rounded-md bg-inherit py-1.5 pl-1.5 pr-5 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-darkGold focus:outline-none focus:ring-2 focus:ring-darkGold sm:text-sm sm:leading-6"
                aria-haspopup="listbox"
                aria-expanded="true"
                aria-labelledby="listbox-label"
                @click="showDropDown()"
              >
                <span class="flex items-center">
                  <img
                    :src="selectedCurrency.img"
                    alt=""
                    class="h-6 w-6 flex-shrink-0 rounded-full hidden"
                  >
                  <span class="ml-2 block truncate text-brightGold">{{ selectedCurrency.code }}</span>
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
                  v-for="value in currencies "
                  id="listbox-option-0"
                  :key="value.id"
                  class="relative cursor-default select-none py-2 pl-3 text-gray-900"
                  role="option"
                  @click="selectCurrency(value.id)"
                >
                  <div class="flex items-center w-full">
                    <img
                      :src="value.img"
                      alt=""
                      class="h-5 w-5 flex-shrink-0 rounded-full hidden"
                    >
                    <!-- Selected: "font-semibold", Not Selected: "font-normal" -->
                    <span class="ml-3 block truncate font-normal text-black w-full">{{ value.code }}</span>
                  </div>

                  <!--
          Checkmark, only display for selected option.

          Highlighted: "text-white", Not Highlighted: "text-indigo-600"
        -->
                  <span
                    v-if="value.id === selectedCurrency.id"
                    class="absolute inset-y-0 right-[0px] flex items-center  text-indigo-600"
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
                    :src="store.UserAccount?.profile_pic"
                    alt=""
                  >
                </button>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
  </nav>

  <!-- New JOb Offer Modal -->
  <!-- Open the modal using ID.showModal() method -->
  <button
    v-show="store.UserAccount.account_type == 'worker'"
    ref="popUp"
    class="absolute"
    onclick="my_modal_100.showModal()"
  />
  <dialog
    v-show="store.UserAccount.account_type == 'worker'"
    id="my_modal_100"
    class="modal"
  >
    <div class="modal-box text-black w-96">
      <h3 class="font-bold text-center text-black text-xl satoshiM">
        Possible Job Offer
      </h3>
      <p class="py-4 text-center ">
        A client just reach out for a job
      </p>
      <div class="flex items-start gap-6 mb-5 justify-center">
        <!-- avatar -->
        <div class="avatar">
          <div class="ring-darkGold ring-offset-base-100 w-16 rounded-full ring ring-offset-2">
            <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp">
          </div>
        </div>
        <!-- Profile desc -->
        <div>
          <h3 class="text-[#24242] font-semibold text-sm satoshiM mb-2">
            Raman Ismail
          </h3>
          <div class="flex items-center gap-2 mb-4">
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
          <p class="mb-3">
            Skill Requested
          </p>
          <div class="text-xs py-1 px-2 bg-gray-200 tag rounded-sm mb-2">
            <span class="text-black">Front-End</span>
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

<style>
nav {
  font-family: satoshiB;
}
</style>
