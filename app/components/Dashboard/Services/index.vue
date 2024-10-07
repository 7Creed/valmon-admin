<script setup>
import { useGlobalStore } from '@/store'

// Initialize Variable
const store = useGlobalStore()

function viewSubCategory() {
  store.$patch({
    viewParentSubCategory: true,
  })
}
</script>

<template>
  <!-- Table -->
  <div
    v-if="store.viewParentSubCategory === false && store.viewSkills === false"
    class="card card-compact bg-base-100 w-full shadow-xl"
  >
    <div class="card-body">
      <!-- Captions -->
      <div class="card-title justify-between border-b-[1.5px] pb-4">
        <!-- content 1 -->
        <div class="text-sm">
          <div class="mb-2">
            <span class="text-valmon_menu font-medium">Parent Category List</span>
            <span class="inline-block text-valmon_Gold text-xs ms-3">3 Parent Categories</span>
          </div>
          <p>List Of All Customers on The Platform</p>
        </div>
        <!-- Content 2 -->
        <div class="flex items-center gap-8 justify-between">
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
            <BaseAddButton
              title="Add New"
              class=""
            />
          </span>
        </div>
      </div>
      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="table text-center">
          <!-- head -->
          <thead>
            <tr>
              <th>
                Serial Number
              </th>
              <th>Category Image</th>
              <th>
                <span>Category Name</span>
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
                <span>Sub Category</span>
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
                <span>Total Users</span>
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
                <span>Total Transaction</span>
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
                <span>Total Transaction Value</span>
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
                <span>Valmon Earning</span>
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
              <th />
            </tr>
          </thead>
          <tbody>
            <!-- row 1 -->
            <tr
              v-for="(item, index) in 6"
              :key="index"
            >
              <th>
                1
              </th>
              <td>
                <div class="flex items-center justify-center">
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
                Services  Skills
              </td>
              <td>44</td>
              <td>13,000</td>
              <td>13,000</td>
              <td>NGN 76,000</td>
              <td>NGN 7,600</td>

              <td
                class="dropdown dropdown-end"
                tabindex="0"
              >
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
                    d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z"
                  />
                </svg>
                <ul
                  tabindex="0"
                  class="dropdown-content menu bg-base-100 rounded-box z-[1] w-24 p-2 shadow"
                >
                  <li @click="viewSubCategory()">
                    <a>View</a>
                  </li>
                  <li><a>Delete</a></li>
                </ul>
              </td>
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

  <!-- Sub-Category -->
  <DashboardServicesSubCategory v-if="store.viewParentSubCategory && store.viewSkills === false" />
  <DashboardServicesSkill v-if="store.viewSkills" />
</template>
