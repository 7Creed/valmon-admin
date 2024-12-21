<script setup>
import profile from '@/assets/icons/cardprofile.svg'
import trash from '@/assets/icons/trash.svg'
import poscard from '@/assets/icons/card-pos-black.svg'

import { ListingsController } from '~/services/modules/Admin/listing'
import { useGlobalStore } from '~/store'

const store = useGlobalStore()
const emit = defineEmits('products')

const emitEvent = (id) => {
  store.$patch({
    adminListingId: id,
  })

  emit('products')
}
const { getCloseListing } = ListingsController()

const closeList = ref([])
const loading = ref(false)
const closeListing = async () => {
  loading.value = true
  const { data, error, status } = await getCloseListing()
  if (status.value === 'success') {
    closeList.value = data.value.data
    loading.value = false
  }
  if (status.value === 'error') {
    handleError('error', error.value.data.message)
    loading.value = false
  }
}
closeListing()
</script>

<template>
  <SharedLoader v-if="loading" />
  <div v-else class="text-card w-full">
    <!-- Stats card -->
    <div class=" flex flex-wrap gap-6 mb-10">
      <DashboardStatsCard
        title="Total Transactions"
        :value="closeList.total_transactions"
        :percentage="closeList.percentage.total_transactions"
        :icon="profile"
        icon-bg="bg-[#F45E5E1A]"
      />
      <DashboardStatsCard
        title="Transaction Value"
        :value="closeList.transactions_value"
        :percentage="closeList.percentage.transactions_value"
        :icon="poscard"
        icon-bg="bg-[#5EF4881A]"
      />
      <DashboardStatsCard
        title="Deleting Listings"
        :value="closeList.deleted_count"
        :icon="trash"
        icon-bg="bg-[#F45E5E1A]"
      />

      <DashboardCardCategory
        title="Top Marketplace Categories"
        :top-categories="closeList?.top_categoryies"
      />
    </div>
    <!-- Table -->
    <div class="card card-compact bg-base-100 w-full shadow-xl">
      <div class="card-body">
        <!-- Captions -->
        <div class="card-title justify-between border-b-[1.5px] pb-4">
          <!-- content 1 -->
          <div class="text-sm">
            <div class="mb-2">
              <span class="text-valmon_menu font-medium">Marketplace Transactions</span>
              <span class="inline-block text-valmon_Gold text-xs ms-3">{{ closeList.total_transactions }} listed</span>
            </div>
            <p>All Transactions on The Marketplace Platform</p>
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
                  <span>Price Listed</span>
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
                  <span>Price Sold</span>
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
                  <span>Buyer Name</span>
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
                  <span>Delivery Time</span>
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
                  <span>Close Date</span>
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
              <!-- Use this -->
              <tr
                v-for="(item, index) in closeList.all_listings"
                :key="item.id"
              >
                <th>
                  {{ index + 1 }}
                </th>
                <td>
                  <div class="flex items-center gap-3">
                    <div class="avatar">
                      <div class="mask mask-squircle h-9 w-9">
                        <img
                          :src="item.image ?? 'N/A'"
                          :alt=" item.image ?? 'N/A'"
                        >
                      </div>
                    </div>
                  </div>
                </td>
                <td class="font-medium text-valmon_menu">
                  {{ item.name }}
                </td>
                <td>{{ item.condition }}</td>
                <td>{{ item.category }}</td>
                <td>NGN {{ item.price_listed }} </td>
                <td>NGN {{ item.price_sold }}</td>
                <td>{{ item.seller_name }}</td>
                <td
                  :class="{ 'text-red-600': index == 5 }"
                >
                  {{ item.buyer_name }}
                </td>

                <td v-text="item.delivered_at ? formatDate(item.close_date) : 'N/A'" />

                <td>{{ formatDate(item.listing_date) }}</td>
                <td v-text="item.close_date ? formatDate(item.close_date) : 'N/A'" />
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
                    <li  @click="emitEvent(item.id)">
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
  </div>
</template>
