<script setup>
import { useGlobalStore } from '@/store'

import { SKillsController } from '~/services/modules/Admin/skills'

// Initialize Variable
const store = useGlobalStore()
const { customer } = SKillsController()
const props = defineProps({
  customerId: String,
})
function goBackward() {
  store.$patch({
    viewSkills: false,
  })
}

const customers = ref([])

const fetchCustomer = async (id) => {
  try {
    const { data, error, status } = await customer(id)
    if (status.value === 'success') {
      customers.value = data.value.data
    }
    if (status.value === 'error') {
      console.error(error.value)
    }
  }
  catch (error) {
    console.error(error)
  }
}

fetchCustomer(props?.customerId)

/* ------------------------------- Pagination ------------------------------- */

const searchTerm = ref('')

const filteredTxList = computed(() => {
  // Ensure transactions and all_transactions exist
  if (!customers.value) return []

  // Filter the list based on searchTerm
  const searchTermLower = searchTerm.value.toLowerCase() // Convert once
  const filteredList = customers.value.filter(
    item => item.name.toLowerCase().includes(searchTermLower),
  )

  // Return filteredList if it has items, otherwise return the full list
  return filteredList.length ? filteredList : customers.value
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
  <BaseBackButton @click="goBackward()" />
  <!-- Table -->
  <div
    class="card card-compact bg-base-100 w-full shadow-xl table_adjustment"
  >
    <div class="card-body">
      <!-- Captions -->
      <div class="card-title justify-between border-b-[1.5px] pb-4">
        <!-- content 1 -->
        <div class="text-sm">
          <div class="mb-2">
            <span class="text-valmon_menu font-medium">Customers</span>
            <span class="inline-block text-valmon_Gold text-xs ms-3">{{ customers?.length }} Registered</span>
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
              v-model="searchTerm"
              type="text"
              class="grow"
              placeholder="Search"
            >
          </label>
          <!-- filter -->
          <!-- <span class="center gap-2">
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
        <span
          v-if=" !filteredTxList.length || !filteredTxList"
          class="loading loading-spinner"
        />
        <table
          v-else
          class="table"
        >
          <!-- head -->
          <thead>
            <tr>
              <th>
                Serial Number
              </th>
              <th>Image</th>
              <th>
                <span>Name</span>
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
                <span>Email</span>
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
                <span>Market Listing</span>
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
                <span>Joined Date</span>
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
                <span>Times Reported</span>
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
                <span>Types</span>
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
                <span>Last Seen</span>
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
              <th />
            </tr>
          </thead>
          <tbody>
            <!-- row 2 -->
            <!-- Use this -->
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
                        :alt=" item.image ?? 'N/A'"
                      >
                    </div>
                  </div>
                </div>
              </td>
              <td class="font-medium text-valmon_menu">
                {{ item.name }}
              </td>
              <td>{{ item.email }}</td>
              <td>{{ item.listings_count }}</td>
              <td>{{ formatDate(item.join_date) }}</td>
              <td>{{ item.reported_count }}</td>
              <td>{{ item.type }}</td>
              <td>{{ formatDate(item.last_seen_at) == 'Invalid date' ? 'Never' : formatDate(item.last_seen_at) }}</td>
              <th>
                <button class="btn text-[#364254]  btn-xs ">
                  <span class="inline-block p-1 bg-[#6C778B] rounded-full" />
                  <span>{{ (item.status).toLowerCase() }}</span>
                </button>
              </th>
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
                  <li>
                    <a>View</a>
                  </li>
                  <li><a>Delete</a></li>
                </ul>
              </td>
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
</template>
