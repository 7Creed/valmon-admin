<script setup>
import profile from '@/assets/icons/cardprofile.svg'
import cardwhite from '@/assets/icons/card-pos.svg'
import cardblack from '@/assets/icons/card-pos-black.svg'

import { SKillsController } from '~/services/modules/Admin/skills'
import { useGlobalStore } from '~/store'

const store = useGlobalStore()
const addSubCatBtn = ref(null)

store.NewSubCategory = false

const { createSubCategory, editSC } = SKillsController()
const props = defineProps({
  viewOption: String,
  type: String,
  transactions: Array,
  categoryId: String,
  txLoader: Boolean,
})
const emit = defineEmits(['custom-events'])

const view = (id) => {
  emit('custom-events', id)
}

// const Services = inject('services')

// const fileData = ref(null)
// const setFile = (e) => {
//   fileData.value = (e.target).files?.[0]
//   console.log(fileData.value)
// }

const subCategory = reactive({
  name: '',
  description: '',
  service_category_id: props?.categoryId,
})

const loader = ref(false)
const selectedItemId = ref(null)

const addSubCategory = async () => {
  const formdata = new FormData()
  formdata.append('name', subCategory.name)
  formdata.append('description', subCategory.description)
  formdata.append('service_category_id', subCategory.service_category_id)
  // formdata.append('service_image', fileData.value)

  loader.value = true
  const { data, error, status } = selectedItemId.value ? await editSC(selectedItemId.value, subCategory) : await createSubCategory(formdata)
  if (status.value === 'success') {
    store.NewSubCategory = true
    loader.value = false
    handleALert('success', data.value.message)
    console.log(data.value.message)
    closeModal(addSubCatBtn)
  }
  if (status.value === 'error') {
    loader.value = false
    console.log(error.value.message)
    closeModal(addSubCatBtn)
  }
}
/* -------- Update/delete the Transaction store property for deleting items -------- */
// EDIT
const addNew = ref(null)

const addSubCategorySkills = () => {
  selectedItemId.value = null
  if (addNew.value) addNew.value.click()
}
const edit = (id) => {
  selectedItemId.value = id
  if (addNew.value) addNew.value.click()
}

// DELETE
const deleteSC = (key, id) => {
  store.updateTx(key, id)
}
/* ------------------------------- Pagination ------------------------------- */

const searchTerm = ref('')

const filteredTxList = computed(() => {
  // Ensure transactions and all_transactions or all_sub_categories exist
  if (!props.transactions?.all_transactions && !props.transactions?.all_sub_categories) return []

  const activeList = props?.type == 'sub-category' ? props?.transactions?.all_sub_categories : props?.transactions?.all_transactions
  // Filter the list based on searchTerm
  const searchTermLower = searchTerm.value.toLowerCase() // Convert once
  const filteredList = activeList.filter(
    Txn => Txn?.employer_name?.toLowerCase()?.includes(searchTermLower)
    || Txn?.employee_name?.toLowerCase()?.includes(searchTermLower)
    || Txn?.name?.toLowerCase()?.includes(searchTermLower),
  )

  // Return filteredList if it has items, otherwise return the full list
  return filteredList.length ? filteredList : activeList
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
  <div>
    <!-- Stats card -->
    <div class="flex flex-wrap gap-6 mb-10 ">
      <DashboardStatsCard
        title="Total Transaction"
        :value="transactions?.transaction_count || transactions?.total_tansactions"
        :percentage="transactions?.transaction_count_percentage || transactions?.percentage?.total_transactions"
        :icon="profile"
        icon-bg="bg-[#F45E5E1A]"
      />
      <DashboardStatsCard
        title="Transaction Value"
        :value="transactions?.transaction_value"
        :percentage="transactions?.transaction_value_percentage || transactions?.percentage?.transactions_value"
        :icon="cardblack"
        icon-bg="bg-[#5EF4881A]"
      />
      <DashboardStatsCard
        title="Valmon Earnings"
        :value="transactions?.valmon_earning || transactions?.valmon_earnings"
        :percentage="transactions?.valmon_earning_percentage || transactions?.percentage?.valmon_earnings"
        :icon="cardwhite"
        icon-bg="bg-darkGold"
      />
      <DashboardCardCategory
        title="Top Categories"
        :top-categories="transactions?.top_categories || transactions?.top_sub_categories"
      />
    </div>
    <!-- Table -->
    <div class="card card-compact bg-base-100 table_adjustment w-full shadow-xl">
      <div class="card-body">
        <!-- Captions -->
        <div class="card-title justify-between border-b-[1.5px] pb-4">
          <!-- content 1 -->
          <div class="text-sm">
            <div class="mb-2">
              <span class="text-valmon_menu font-medium">{{ type == 'skill' ? 'Transactions' : 'Sub Category List'
              }}</span>
              <span
                v-if="type == 'sub-category'"
                class="inline-block text-valmon_Gold text-xs ms-3"
              >{{
                transactions?.all_sub_categories?.length }}  Sub Categories</span>
            </div>
            <p v-if="type == 'skill'">
              List Of All Transactions on The Platform
            </p>
            <p v-else-if="type == 'sub-category'">
              List Of All Listings on The Platform
            </p>
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
              <span v-if="type == 'sub-category'">
                <BaseAddButton
                  title="Add New"
                  @click="addSubCategorySkills"
                />
                <span
                  ref="addNew"
                  onclick="my_modal_1.showModal()"
                />
              </span>
            </span>
          </div>
        </div>
        <!-- Table -->
        <div class="overflow-x-auto">
          <div class="overflow-x-auto pb-[12rem]">
            <span
              v-if="txLoader || !filteredTxList"
              class="loading loading-spinner"
            />
            <table
              v-else
              class="table"
            >
              <!-- head -->
              <thead>
                <template v-if="type === 'skill'">
                  <tr>
                    <th>
                      Serial Number
                    </th>
                    <th>Employer</th>
                    <th>
                      <span>Employee</span>
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
                      <span>Skill</span>
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
                      <span>Job Time</span>
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
                      <span>Amount</span>
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
                      <span>To Valmon</span>
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
                      <span>Date</span>
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
                </template>
                <template v-if="type === 'sub-category'">
                  <tr>
                    <th>
                      Serial Number
                    </th>
                    <th>Category Name</th>
                    <th>Total Users</th>
                    <th>Total Transactions</th>
                    <th>Transacted Value</th>
                    <th>Valmon Earning</th>
                  </tr>
                </template>
              </thead>
              <tbody>
                <!-- Use this -->
                <template v-if="type == 'skill'">
                  <tr
                    v-for="(item, index) in filteredTxList?.slice(startIndex, endIndex) || filteredTxList?.all_sub_categories?.slice(startIndex, endIndex)"
                    :key="item.id"
                  >
                    <th>
                      {{ index + 1 }}
                    </th>
                    <td>
                      {{ item.employer_name }}
                    </td>
                    <td class="font-medium text-valmon_menu">
                      {{ item.employee_name }}
                    </td>
                    <td>{{ item.category || 'N/A' }}</td>
                    <td>N/A</td>
                    <td> {{ getHours(item.job_created_at, item.job_completed_at) }}Hours</td>
                    <td>NGN {{ item.amount }}</td>
                    <td>NGN {{ item.to_valmon }}</td>
                    <td>{{ formatDate(item.date) }}</td>
                    <th>
                      <button class="btn text-[#AD7A22]  btn-xs ">
                        <span class="inline-block p-1 bg-[#E79E1F] rounded-full" />
                        <span>{{ item.status }}</span>
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
                        <li @click="view(item.id)">
                          <a>View</a>
                        </li>
                        <li><a>Delete</a></li>
                      </ul>
                    </td>
                  </tr>
                </template>
                <template v-if="type == 'sub-category'">
                  <tr
                    v-for="(item, index) in filteredTxList?.slice(startIndex, endIndex)"
                    :key="item.id"
                  >
                    <th>
                      {{ index + 1 }}
                    </th>
                    <th>{{ item.name }}</th>
                    <th>{{ item.total_users }}</th>
                    <th>{{ item.total_transactions }}</th>
                    <th>{{ item.transacted_value }}</th>
                    <th>{{ item.valmon_earning }}</th>
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
                        <li @click="view(item.id)">
                          <a>View</a>
                        </li>
                        <li @click="edit(item.id)">
                          <a>Edit</a>
                        </li>
                        <li @click="deleteSC('subcategory', item.id)">
                          <a>Delete</a>
                        </li>
                      </ul>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <SharedPagination
      :item="filteredTxList?.length"
      @slice-index="pagination"
    />
    <!-- Add Category -->
    <dialog
      id="my_modal_1"
      class="modal"
    >
      <div class="modal-box">
        <h3
          class="text-3xl font-bold text-center text-[rgba(35, 35, 35, 1)] mb-4"
          :class="{ 'text-red-500': selectedItemId }"
        >
          <span
            v-if="selectedItemId"
          >Edit</span> Sub Category Name
        </h3>
        <BaseInput
          v-model="subCategory.name"
          label="Sub Category Name"
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
            v-model="subCategory.description"
            class="textarea textarea-bordered h-24"
            placeholder="Bio"
          />

        </label>

        <!-- <label class="form-control w-full mb-6">
          <div class="label">
            <span class="label-text text-labels font-medium">Pick a file</span>

          </div>
          <input
            type="file"
            class="file-input file-input-bordered w-full "
            @change="setFile"
          >
        </label> -->

        <BaseButton
          :loading="loader"
          title="Add"
          color="rgba(33, 31, 31, 1)"
          text-color="rgba(255, 255, 255, 1)"
          :outline="false"
          class="block w-full"
          @click="addSubCategory"
        />

        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button
              ref="addSubCatBtn"
              class="btn"
            >
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>
