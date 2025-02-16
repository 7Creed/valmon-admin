<script setup>
import { ListingsController } from '~/services/modules/Admin/listing'

const categoryName = ref('')
const loading = ref(false)
const { createMarketPlaceListing } = ListingsController()
const Save = async () => {
  loading.value = true // Set loading to true before making the request

  const { data, error, status } = await createMarketPlaceListing({ name: categoryName.value })
  if (status.value === 'success') {
    loading.value = false
    handleALert('success', data.value.message)
  }
  if (status.value === 'error') {
    loading.value = false
    handleALert('error', error.value)
  }
}

const listingCategory = ref([])
const { getMarketPlaceListing } = ListingsController()
const fetchLoading = ref(false)
const fetchListingCategory = async () => {
  fetchLoading.value = true // Set loading to true before making the request

  const { data, error, status } = await getMarketPlaceListing()
  if (status.value === 'success') {
    fetchLoading.value = false
    listingCategory.value = data.value.data
  }
  if (status.value === 'error') {
    fetchLoading.value = false
    handleALert('error', error.value)
  }
}

fetchListingCategory()

/* ------------------------------- Pagination ------------------------------- */

const searchTerm = ref('')

const filteredTxList = computed(() => {
  // Ensure transactions and all_transactions exist
  if (!listingCategory.value) return []

  // Filter the list based on searchTerm
  const searchTermLower = searchTerm.value.toLowerCase() // Convert once
  const filteredList = listingCategory.value.filter(
    item => item.name.toLowerCase().includes(searchTermLower),
  )

  // Return filteredList if it has items, otherwise return the full list
  return filteredList.length ? filteredList : listingCategory.value
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
  <div class="w-full">
    <SharedLoader v-if="fetchLoading" />

    <!-- Table -->
    <div
      v-else
      class="card card-compact bg-base-100 w-full shadow-xl"
    >
      <div class="card-body">
        <!-- Captions -->
        <div class="card-title justify-between border-b-[1.5px] pb-4">
          <!-- content 1 -->
          <div class="text-sm">
            <div class="mb-2">
              <span class="text-valmon_menu font-medium">Category List</span>
              <span class="inline-block text-valmon_Gold text-xs ms-3">{{ listingCategory?.length }} Parent
                Categories</span>
            </div>
            <p>List Of All Listings on The Platform</p>
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
            <span class="center gap-2">
              <!-- <svg
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
            </svg> -->
              <!-- <span class="text-base text-[#344054]">Filters</span> -->
              <BaseAddButton
                title="Add New"
                class=""
                onclick="my_modal_1.showModal()"
              />
            </span>
          </div>
        </div>
        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="table table-auto text-center">
            <!-- head -->
            <thead>
              <tr>
                <th>
                  Serial Number
                </th>

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
                  <span>Product Listed</span>
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
                  <span>Product Sold</span>
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
                  <span>Active Solid Cost</span>
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
                  <span>Sold Amount</span>
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
                v-for="(item, index) in filteredTxList?.slice(startIndex, endIndex)"
                :key="index"
              >
                <th>
                  {{ index + 1 }}
                </th>
                <td>
                  {{ item?.name }}
                </td>
                <td class="">
                  {{ item?.products_listed }}
                </td>
                <td>
                  NGN {{ item?.products_sold }}
                </td>
                <td>NGN {{ item?.active_listings_cost }}</td>
                <td>NGN {{ item?.sold_amount }}</td>

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
  </div>
  <!-- Add Proifle -->
  <dialog
    id="my_modal_1"
    class="modal"
  >
    <div class="modal-box">
      <div class="card-body  flex justify-center gap-10">
        <h2 class="card-title text-[rgba(35, 35, 35, 1)] font-bold text-3xl text-center">
          Add Category
        </h2>

        <BaseInput
          v-model="categoryName"
          label="Category Name"
          type="text"
          placeholder="phone"
          class="mb-6 "
        />
        <div class="card-actions justify-center">
          <BaseButton
            :loading="loading"
            title="Save"
            color="rgba(33, 31, 31, 1)"
            text-color="rgba(255, 255, 255, 1)"
            border="#8B6914"
            :outline="false"
            class="block mb-5 w-[50%]"
            @click="Save"
          />
        </div>
      </div>

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
