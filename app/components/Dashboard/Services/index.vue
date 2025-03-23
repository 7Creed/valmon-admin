<script setup>
import { useGlobalStore } from '@/store'

import { SKillsController } from '~/services/modules/Admin/skills'

// Initialize Variable
const store = useGlobalStore()
const { parentCategory, createCategory } = SKillsController()

provide('services', 'services')

const loading = ref(false)
const addPCBtn = ref(null)
// Handle Views
const PCategoryId = ref(null)
function viewSubCategory(id) {
  PCategoryId.value = id
  store.$patch({
    viewParentSubCategory: true,
  })
}

const customerId = ref(null)
const setViewSkill = (id) => {
  customerId.value = id
}

const fileData = ref(null)
const setFile = (e) => {
  fileData.value = (e.target).files?.[0]
}

// Handle Parent Category feedback data
const parentCategoryData = reactive({
  name: '',
  description: '',
})

const PCData = ref([])
const PCDataLoader = ref(false)
const fetchParentCategory = async () => {
  PCDataLoader.value = true
  try {
    const { status, data, error } = await parentCategory()
    if (status.value === 'success') {
      PCData.value = data.value.data
    }
    if (status.value === 'error') {
      handleALert('error', error.value.data.message)
    }
  }
  catch (error) {
    handleError(error)
  }
  finally {
    PCDataLoader.value = false
  }
}

fetchParentCategory()

// Api call

const saveCategory = async () => {
  loading.value = true
  const formData = new FormData()
  formData.append('category_image', fileData.value)
  formData.append('name', parentCategoryData.description)
  formData.append('description', parentCategoryData.name)

  try {
    const { status, data, error } = await createCategory(formData)
    if (status.value === 'success') {
      handleALert('success', data.value.message)
    }
    if (status.value === 'error') {
      handleALert('error', error.value.data.message)
    }
  }
  catch (error) {
    handleError(error)
  }
  finally {
    loading.value = false
    closeModal(addPCBtn.value)
  }
}

/* ------------------------------- Pagination ------------------------------- */

const searchTerm = ref('')

const filteredTxList = computed(() => {
  // Ensure transactions and all_transactions exist
  if (!PCData.value) return []

  // Filter the list based on searchTerm
  const searchTermLower = searchTerm.value.toLowerCase() // Convert once
  const filteredList = PCData.value.filter(
    item => item.name.toLowerCase().includes(searchTermLower),
  )

  // Return filteredList if it has items, otherwise return the full list
  return filteredList.length ? filteredList : PCData.value
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
  <!-- Table -->
  <div
    v-if="store.viewParentSubCategory === false && store.viewSkills === false"
    class="card card-compact bg-base-100 w-full shadow-xl table_adjustment"
  >
    <div class="card-body">
      <!-- Captions -->
      <div class="card-title justify-between border-b-[1.5px] pb-4">
        <!-- content 1 -->
        <div class="text-sm">
          <div class="mb-2">
            <span class="text-valmon_menu font-medium">Parent Category List</span>
            <span class="inline-block text-valmon_Gold text-xs ms-3">{{ filteredTxList?.length }} Parent Categories</span>
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
            </svg>
            <span class="text-base text-[#344054]">Filters</span> -->
            <BaseAddButton
              title="Add New"
              class=""
              onclick="my_modal_1.showModal()"
            />
          </span>
        </div>
      </div>
      <!-- Table -->
      <div class="overflow-x-auto pb-[8rem]">
        <span
          v-if=" PCDataLoader|| !filteredTxList"
          class="loading loading-spinner"
        />
        <table
          v-else
          class="table text-center"
        >
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
              v-for="(item, index) in filteredTxList?.slice(startIndex, endIndex)"
              :key="index"
            >
              <th>
                {{ index + 1 }}
              </th>
              <td>
                <div class="flex items-center justify-center">
                  <div class="avatar">
                    <div class="mask mask-squircle h-9 w-9">
                      <img
                        :src="item.image"
                        alt=" image"
                      >
                    </div>
                  </div>
                </div>
              </td>
              <td class="font-medium text-valmon_menu">
                {{ item.name }}
              </td>
              <td>{{ item.sub_categories_count }}</td>
              <td>{{ item.total_users }}</td>
              <td>{{ item.total_transactions }}</td>
              <td>NGN {{ item.transacted_value }}</td>
              <td>NGN {{ item.valmon_earning }}</td>

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
                  <li @click="viewSubCategory(item.id)">
                    <a>View</a>
                  </li>
                  <li @click="deleteParentCategory(item.id)">
                    <a>Delete</a>
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <SharedPagination
    v-if="store.viewParentSubCategory === false && store.viewSkills === false"
    :item="filteredTxList.length"
    @slice-index="pagination"
  />
  <!-- Sub-Category -->
  <DashboardServicesSubCategory
    v-if="store.viewParentSubCategory && store.viewSkills === false"
    :category-id="PCategoryId"
    @customer-events="setViewSkill"
  />

  <DashboardServicesSkill
    v-if="store.viewSkills"
    :customer-id="customerId"
  />

  <!-- Open the modal using ID.showModal() method -->
  <!-- Add Category -->
  <dialog
    id="my_modal_1"
    class="modal"
  >
    <div class="modal-box">
      <h3 class="text-3xl font-bold text-center text-[rgba(35, 35, 35, 1)] mb-4">
        Add Parent Category
      </h3>
      <BaseInput
        v-model="parentCategoryData.name"
        label="Name"
        type="text"
        :icon="false"
        :required="true"
        class="block mb-4"
      />
      <label class="form-control mb-4">
        <div class="label">
          <span class="label-text text-base text-labels font-medium">Description</span>
        </div>
        <textarea
          v-model="parentCategoryData.description"
          class="textarea textarea-bordered h-24"
          placeholder="Bio"
        />

      </label>

      <label class="form-control w-full mb-6">
        <div class="label">
          <span class="label-text text-labels font-medium">Pick a file</span>

        </div>
        <input
          type="file"
          class="file-input file-input-bordered w-full "
          @change="setFile"
        >
      </label>

      <BaseButton
        :loading="loading"
        :title="savedBtn"
        color="rgba(33, 31, 31, 1)"
        text-color="rgba(255, 255, 255, 1)"
        :outline="false"
        class="block w-full"
        @click="saveCategory"
      />

      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button class="btn" ref="addPCBtn">
            Close
          </button>
        </form>
      </div>
    </div>
  </dialog>
</template>
