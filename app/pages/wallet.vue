<script setup>
import shop from '@/assets/icons/shop.svg'
import cardpos from '@/assets/icons/card-pos-black.svg'
import nigeriaFlag from '@/assets/icons/nigeriaflag.svg'

definePageMeta({
  layout: 'dashboard-layout',
})

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
const currencies = [
  { id: 1, name: 'NGN', img: nigeriaFlag },
  { id: 2, name: 'EUR', img: nigeriaFlag },
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
  <div class="text-card w-full bg-primary_bg p-10">
    <!-- Stats card -->
    <div class=" flex flex-wrap gap-6 mb-10">
      <div class="card  shadow-xl  bg-brightGold">
        <div class="card-body">
          <h2 class="card-title text-sm text-black font-extrabold mb-3">
            Wallet Balance
          </h2>
          <div class="flex gap-4 items-center">
            <span class="text-black text-4xl font-extrabold satoshiM">NGN 47,150,000</span>
            <span><svg
              width="25"
              height="25"
              viewBox="0 0 34 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 0C25.4725 0 32.5214 6.03556 34 14C32.523 21.9644 25.4725 28 17 28C8.5275 28 1.4786 21.9644 0 14C1.47703 6.03556 8.5275 0 17 0ZM17 24.8889C20.2046 24.8882 23.3141 23.8106 25.8195 21.8325C28.3249 19.8544 30.0779 17.0929 30.7914 14C30.0752 10.9096 28.3212 8.15112 25.816 6.1756C23.3109 4.20007 20.2028 3.12438 17 3.12438C13.7972 3.12438 10.6891 4.20007 8.18397 6.1756C5.67881 8.15112 3.92477 10.9096 3.20861 14C3.92214 17.0929 5.67506 19.8544 8.18046 21.8325C10.6859 23.8106 13.7954 24.8882 17 24.8889ZM17 21C15.1247 21 13.3262 20.2625 12.0001 18.9497C10.6741 17.637 9.92911 15.8565 9.92911 14C9.92911 12.1435 10.6741 10.363 12.0001 9.05025C13.3262 7.7375 15.1247 7 17 7C18.8753 7 20.6738 7.7375 21.9999 9.05025C23.3259 10.363 24.0709 12.1435 24.0709 14C24.0709 15.8565 23.3259 17.637 21.9999 18.9497C20.6738 20.2625 18.8753 21 17 21ZM17 17.8889C18.0418 17.8889 19.041 17.4792 19.7777 16.7499C20.5144 16.0206 20.9283 15.0314 20.9283 14C20.9283 12.9686 20.5144 11.9794 19.7777 11.2501C19.041 10.5208 18.0418 10.1111 17 10.1111C15.9582 10.1111 14.959 10.5208 14.2223 11.2501C13.4856 11.9794 13.0717 12.9686 13.0717 14C13.0717 15.0314 13.4856 16.0206 14.2223 16.7499C14.959 17.4792 15.9582 17.8889 17 17.8889Z"
                fill="#101011"
              />
            </svg></span>
          </div>
          <div class="card-actions justify-start">
            <button
              class="btn btn-neutral "
              onclick="my_modal_1.showModal()"
            >
              <span>Withdraw</span>
              <span><svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.4"
                  d="M22 10.7599C22 10.2899 21.62 9.8999 21.14 9.8999H2.86C2.38 9.8999 2 10.2799 2 10.7599C2 16.6499 6.11 20.7599 12 20.7599C17.89 20.7599 22 16.6399 22 10.7599Z"
                  fill="white"
                />
                <path
                  d="M12.5299 3.45992L15.3799 6.29992C15.6699 6.58992 15.6699 7.06992 15.3799 7.35992C15.0899 7.64992 14.6099 7.64992 14.3199 7.35992L12.7499 5.79992V15.3699C12.7499 15.7799 12.4099 16.1199 11.9999 16.1199C11.5899 16.1199 11.2499 15.7799 11.2499 15.3699V5.79992L9.6899 7.36992C9.3999 7.65992 8.9199 7.65992 8.6299 7.36992C8.4799 7.21992 8.3999 7.02992 8.3999 6.83992C8.3999 6.64992 8.4699 6.45992 8.6199 6.30992L11.4699 3.46992C11.7599 3.16992 12.2399 3.16992 12.5299 3.45992Z"
                  fill="white"
                />
              </svg></span>
            </button>
          </div>
        </div>
      </div>
      <div class="w-1/3">
        <DashboardStatsCard
          title="Total Income"
          value="NGN 10,000"
          percentage="8.5"
          :icon="shop"
          icon-bg="bg-[#5EA6F41A]"
          :second-card="true"
          class="mb-4"
        />
        <DashboardStatsCard
          title="Awaiting Value"
          value="99,500,000"
          percentage="8.5"
          :icon="cardpos"
          :second-card="true"
          icon-bg="bg-[#5EF4881A]"
        />
      </div>

      <div class="w-[20%] bg-black flex flex-col items-center justify-center gap-5 rounded-2xl">
        <label class="text-white text-lg">Select Currency</label>
        <div

          class="relative"
        >
          <button
            type="button"
            class="relative w-[7.2rem] cursor-default rounded-md bg-inherit py-1.5 pl-1.5 pr-5 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-white focus:outline-none focus:ring-2 focus:ring-white sm:text-sm sm:leading-6"
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
    </div>
    <!-- Table -->
    <div class="card card-compact bg-base-100 w-full shadow-xl">
      <div class="card-body">
        <!-- Captions -->
        <div class="card-title justify-between border-b-[1.5px] pb-4">
          <!-- content 1 -->
          <div class="text-sm">
            <div class="mb-2">
              <span class="text-valmon_menu font-medium">Awaiting Approval List</span>
              <span class="inline-block text-valmon_Gold text-xs ms-3">10,000 listed</span>
            </div>
            <p>List Of All Customers on The Platform</p>
          </div>
          <!-- Content 2 -->
          <div class="flex items-center w-1/3 gap-8 justify-between">
            <!-- Search -->
            <label class="input input-bordered flex items-center gap-2 flex-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>

              <input
                type="text"
                class="grow"
                placeholder="Search"
              >
            </label>
            <!-- filter -->
            <span class="center gap-2">
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.06958 10.7696H15.0696M2.56958 5.76959H17.5696M7.56958 15.7696H12.5696"
                  stroke="#344054"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span class="text-base text-[#344054]">Filters</span>
            </span>
          </div>
        </div>
        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="table">
            <!-- head -->
            <thead>
              <tr>
                <th>
                  Serial Number
                </th>
                <th>Image</th>
                <th>
                  <span>Product Name</span>
                  <svg
                    class="inline"
                    width="15"
                    height="14"
                    viewBox="0 0 15 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.57922 3.10291V10.8536M7.57922 10.8536L11.4546 6.97827M7.57922 10.8536L3.70386 6.97827"
                      stroke="#667085"
                      stroke-width="1.10725"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </th>
                <th>
                  <span>Condition</span>
                  <svg
                    class="inline"
                    width="15"
                    height="14"
                    viewBox="0 0 15 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.57922 3.10291V10.8536M7.57922 10.8536L11.4546 6.97827M7.57922 10.8536L3.70386 6.97827"
                      stroke="#667085"
                      stroke-width="1.10725"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </th>
                <th>
                  <span>Color</span>
                  <svg
                    class="inline"
                    width="15"
                    height="14"
                    viewBox="0 0 15 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.57922 3.10291V10.8536M7.57922 10.8536L11.4546 6.97827M7.57922 10.8536L3.70386 6.97827"
                      stroke="#667085"
                      stroke-width="1.10725"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </th>
                <th>
                  <span>Category</span>
                  <svg
                    class="inline"
                    width="15"
                    height="14"
                    viewBox="0 0 15 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.57922 3.10291V10.8536M7.57922 10.8536L11.4546 6.97827M7.57922 10.8536L3.70386 6.97827"
                      stroke="#667085"
                      stroke-width="1.10725"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </th>
                <th>
                  <span>Price</span>
                  <svg
                    class="inline"
                    width="15"
                    height="14"
                    viewBox="0 0 15 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.57922 3.10291V10.8536M7.57922 10.8536L11.4546 6.97827M7.57922 10.8536L3.70386 6.97827"
                      stroke="#667085"
                      stroke-width="1.10725"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </th>
                <th>
                  <span>Seller Name</span>
                  <svg
                    class="inline"
                    width="15"
                    height="14"
                    viewBox="0 0 15 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.57922 3.10291V10.8536M7.57922 10.8536L11.4546 6.97827M7.57922 10.8536L3.70386 6.97827"
                      stroke="#667085"
                      stroke-width="1.10725"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </th>
                <th>
                  <span>Seller Image</span>
                  <svg
                    class="inline"
                    width="15"
                    height="14"
                    viewBox="0 0 15 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.57922 3.10291V10.8536M7.57922 10.8536L11.4546 6.97827M7.57922 10.8536L3.70386 6.97827"
                      stroke="#667085"
                      stroke-width="1.10725"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </th>
                <th>
                  <span>Listing Date</span>
                  <svg
                    class="inline"
                    width="15"
                    height="14"
                    viewBox="0 0 15 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.57922 3.10291V10.8536M7.57922 10.8536L11.4546 6.97827M7.57922 10.8536L3.70386 6.97827"
                      stroke="#667085"
                      stroke-width="1.10725"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </th>
                <th>
                  <span>Status</span>
                  <svg
                    class="inline"
                    width="15"
                    height="14"
                    viewBox="0 0 15 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.57922 3.10291V10.8536M7.57922 10.8536L11.4546 6.97827M7.57922 10.8536L3.70386 6.97827"
                      stroke="#667085"
                      stroke-width="1.10725"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </th>
              </tr>
            </thead>
            <tbody>
              <!-- Use this -->
              <tr
                v-for="(item, index) in 12"
                :key="index"
              >
                <th>
                  {{ index + 2 }}
                </th>
                <td>
                  <div class="flex items-center gap-3">
                    <div class="avatar">
                      <div class="mask mask-squircle h-9 w-9">
                        <img
                          src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                          alt="Avatar Tailwind CSS Component"
                        >
                      </div>
                    </div>
                  </div>
                </td>
                <td class="font-medium text-valmon_menu">
                  Iphone 12
                </td>
                <td>Used</td>
                <td>Black</td>
                <td>Phone</td>
                <td>N437099GN </td>
                <td>Raman Isamil</td>
                <td>
                  <div class="flex items-center gap-3">
                    <div class="avatar">
                      <div class="mask mask-squircle h-9 w-9">
                        <img
                          src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                          alt="Avatar Tailwind CSS Component"
                        >
                      </div>
                    </div>
                  </div>
                </td>
                <td>8/9/2022</td>
                <th>
                  <button class="btn btn-outline text-green-600  btn-xs mr-2 ">
                    Approval
                  </button>
                  <button class="btn btn-outline text-red-600  btn-xs mr-2 ">
                    Deny
                  </button>
                  <button class="btn bg-brightGold text-black btn-xs ">
                    View
                  </button>
                </th>
              </tr>
            </tbody>
          </table>
          <!-- pagination -->
          <div class="card card-compact bg-base-100 shadow-xl mt-10">
            <div class="card-body">
              <div class="pagination flex items-center justify-between text-[#727376]">
                <div class="flex items-baseline w-[28rem] justify-between">
                  <span class="text-sm">Number Of Items displayed per page</span>
                  <select class="select select-bordered select-xs w-full max-w-14 bg-black text-white">
                    <option>16</option>
                  </select>
                  <span class="text-sm">1-13 of 12,400 items</span>
                </div>
                <div class="join">
                  <button class="join-item btn btn-sm">
                    «
                  </button>
                  <button class="join-item btn bg-black text-white  btn-sm">
                    1
                  </button>
                  <button class="join-item btn  btn-sm">
                    2
                  </button>
                  <button class="join-item btn  btn-sm">
                    3
                  </button>
                  <button class="join-item btn  btn-sm">
                    4
                  </button>
                  <span
                    class="join-item btn  btn-sm"
                  >
                    ...
                  </span>
                  <button class="join-item btn  btn-sm">
                    25
                  </button>
                  <button class="join-item btn  btn-sm">
                    »
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <dialog
      id="my_modal_1"
      class="modal"
    >
      <div class="modal-box">
        <h1 class="text-center text-[#232323] text-3xl font-bold mb-5">
          Add Payment Method
        </h1>
        <!-- card -->
        <div class="border-brightGold border-2 p-2 rounded-lg">
          <div
            role="alert"
            class="alert border-[#0000007A] p-2 mb-4 rounded-md"
          >
            <div class="form-control">
              <label class="label cursor-pointer flex gap-4">

                <input
                  type="radio"
                  name="radio-1"
                  class="radio"
                >

                <span class="label-text text-lg font-bold text-[#232323]">Card Payment</span>
              </label>
            </div>
          </div>
          <div
            role="alert"
            class="alert border-[#0000007A] p-2 mb-4 rounded-md"
          >
            <div class="form-control">
              <label class="label cursor-pointer flex gap-4">

                <input
                  type="radio"
                  name="radio-1"
                  class="radio"
                >

                <span class="label-text text-lg font-bold text-[#232323]">Paypal</span>
              </label>
            </div>
          </div>
          <label class="form-control w-full mb-3">
            <div class="label">
              <span class="label-text">Card Number</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered w-full "
            >
          </label>
          <label class="form-control w-full mb-3">
            <div class="label">
              <span class="label-text">Expiry Number</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered w-full "
            >
          </label>
          <label class="form-control w-full mb-3">
            <div class="label">
              <span class="label-text">Cvv</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered w-full "
            >
          </label>
          <button class="btn btn-neutral bg-black text-white w-full">
            Save Card
          </button>
        </div>
        <!-- card -->

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
  </div>
</template>
