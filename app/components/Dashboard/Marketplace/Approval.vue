<script setup>
import shop from '@/assets/icons/shop.svg'
import cardpos from '@/assets/icons/card-pos-black.svg'

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
const { awaitingListing, approveListing, denyListing } = ListingsController()

const waitingList = ref([])
const loading = ref(false)
const getAwaitingListing = async () => {
  loading.value = true
  const { data, error, status } = await awaitingListing()
  if (status.value === 'success') {
    waitingList.value = data.value.data
    loading.value = false
  }
  if (status.value === 'error') {
    handleError('error', error.value.data.message)
    loading.value = false
  }
}
getAwaitingListing()

const listingActions = async (func, id) => {
  const { data, error, status } = await func(id)
  if (status.value === 'success') {
    handleALert('success', data.value.message)
  }
  if (status.value === 'error') {
    handleError('error', error.value.data.message)
  }
}

const approve = (id) => {
  listingActions(approveListing, id)
}

const deny = (id) => {
  listingActions(denyListing, id)
}

/* ------------------------------- Pagination ------------------------------- */

const searchTerm = ref('')

const filteredTxList = computed(() => {
  // Ensure transactions and all_transactions exist
  if (!waitingList.value?.all_listings) return []

  // Filter the list based on searchTerm
  const searchTermLower = searchTerm.value.toLowerCase() // Convert once
  const filteredList = waitingList.value?.all_listings.filter(
    item => item.name.toLowerCase().includes(searchTermLower),
  )

  // Return filteredList if it has items, otherwise return the full list
  return filteredList.length ? filteredList : waitingList.value?.all_listings
})

const startIndex = ref(0)
const endIndex = ref(14)
const pagination = (value) => {
  console.log(value)
  startIndex.value = value.start
  endIndex.value = value.end
}
</script>

<template>
  <SharedLoader v-if="loading" />
  <div
    v-else
    class="text-card w-full"
  >
    <!-- Stats card -->
    <div class=" flex flex-wrap gap-6 mb-10">
      <DashboardStatsCard
        title="Total Awaiting"
        :value="waitingList?.total_awaiting"
        :icon="shop"
        icon-bg="bg-[#5EA6F41A]"
      />
      <DashboardStatsCard
        title="Awaiting Value"
        :value="waitingList?.awaiting_value"
        :icon="cardpos"
        icon-bg="bg-[#5EF4881A]"
      />
    </div>
    <!-- Table -->
    <div class="card card-compact bg-base-100 w-full shadow-xl table_adjustment">
      <div class="card-body">
        <!-- Captions -->
        <div class="card-title justify-between border-b-[1.5px] pb-4">
          <!-- content 1 -->
          <div class="text-sm">
            <div class="mb-2">
              <span class="text-valmon_menu font-medium">Awaiting Approval List</span>
              <span class="inline-block text-valmon_Gold text-xs ms-3">{{ waitingList.total_awaiting }} listed</span>
            </div>
            <p>List Of All Customers on The Platform</p>
          </div>
          <!-- Content 2 -->
          <div class="flex items-center  gap-8 justify-between">
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
                v-model="searchTerm"
                type="text"
                class="grow"
                placeholder="Search"
              >
            </label>
            <!-- filter
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
            </span> -->
          </div>
        </div>
        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="table table-auto">
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
              <tr
                v-for="(item, index) in filteredTxList?.slice(startIndex, endIndex)"
                :key="index"
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
                          :alt="item.image ?? 'N/A'"
                        >
                      </div>
                    </div>
                  </div>
                </td>
                <td class="font-medium text-valmon_menu">
                  {{ item.name }}
                </td>
                <td>{{ (item.condition).slice(0, 20) }}...</td>
                <td>{{ item.color }}</td>
                <td>{{ item.category }}</td>
                <td>NGN{{ item.price }}</td>
                <td>{{ item.seller_name }}</td>
                <td>
                  <div class="flex items-center gap-3">
                    <div class="avatar">
                      <div class="mask mask-squircle h-9 w-9">
                        <img
                          :src="item.seller_image ?? 'N/A'"
                          :alt="item.seller_image ?? 'N/A'"
                        >
                      </div>
                    </div>
                  </div>
                </td>
                <td>{{ formatDate(item.listing_date) }}</td>
                <th>
                  <button
                    class="btn btn-outline text-green-600  btn-xs mr-2 "
                    @click="approve(item.id)"
                  >
                    Approval
                  </button>
                  <button
                    class="btn btn-outline text-red-600  btn-xs mr-2 "
                    @click="deny(item.id)"
                  >
                    Deny
                  </button>
                  <button
                    class="btn bg-brightGold text-black btn-xs "
                    @click="emitEvent(item.id)"
                  >
                    View
                  </button>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <SharedPagination
      :item="filteredTxList.length"
      @slice-index="pagination"
    />
  </div>
</template>
