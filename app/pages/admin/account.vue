<script setup>
import { SettingsController } from '~/services/modules/Admin/settings'

definePageMeta(
  {
    layout: 'dashboard-layout',
  },
)

const { getAdmin, deleteAdmin } = SettingsController()

const newAccount = ref(false)
const AddNew = () => {
  newAccount.value = !newAccount.value
}

const Admins = ref([])
const fetchAdmin = async () => {
  try {
    const { status, data, error } = await getAdmin()
    if (status.value === 'success') {
      console.log(data.value.data)
      Admins.value = data.value.data
    }
    if (status.value === 'error') {
      console.log(error.value.data.message)
      handleALert('error', error.value.data.message)
    }
  }
  catch (error) {
    console.log(error)
  }
}
fetchAdmin()

const convDate = date => formatDate(date)

/* ------------------------------- Pagination ------------------------------- */

const searchTerm = ref('')

const filteredTxList = computed(() => {
  // Ensure transactions and all_transactions exist
  if (!Admins.value) return []

  // Filter the list based on searchTerm
  const searchTermLower = searchTerm.value.toLowerCase() // Convert once
  const filteredList = Admins.value.filter(
    item => item.name.toLowerCase().includes(searchTermLower),
  )

  // Return filteredList if it has items, otherwise return the full list
  return filteredList.length ? filteredList : Admins.value
})

const startIndex = ref(0)
const endIndex = ref(14)
const pagination = (value) => {
  startIndex.value = value.start
  endIndex.value = value.end
}
</script>

<template>
  <div class="text-card bg-primary_bg w-full p-10 px-14">
    <!-- Table -->
    <BaseBackButton
      v-if="newAccount"
      @click="AddNew"
    />
    <div
      v-if="newAccount == false"
      class="card card-compact bg-base-100 w-full shadow-xl"
    >
      <div class="card-body">
        <!-- Captions -->
        <div class="card-title justify-between border-b-[1.5px] pb-4">
          <!-- content 1 -->
          <div class="text-sm">
            <div class="mb-2">
              <span class="text-valmon_menu font-medium text-base">Account Manager</span>
            </div>
            <p>List Of All Customers on The Platform</p>
          </div>
          <!-- Content 2 -->
          <BaseAddButton
            title="Add"
            @click="AddNew"
          />
        </div>
        <!-- Table -->
        <div class="overflow-x-auto">
          <span
            v-if="!filteredTxList.length || !filteredTxList"
            class="loading loading-spinner"
          />
          <table
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
                <!-- <th>
                  <span>Join Date</span>
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
                </th> -->
                <th>
                  <span>Role</span>
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
                          :src="item.image"
                          alt="Avatar Tailwind CSS Component"
                        >
                      </div>
                    </div>
                  </div>
                </td>
                <td class="font-medium text-valmon_menu">
                  {{ item.name }}
                </td>
                <td>{{ item.email }}</td>
                <!-- <td>1/1/2001</td> -->
                <td>
                  {{ item.role }}
                </td>
                <td>{{ convDate(item.last_seen) === 'Invalid Date' ? 'Never' : convDate(item.last_seen) }}</td>
                <th>
                  <button
                    v-if="item.status === 'inactive'"
                    class="btn text-black  btn-xs bg-waring border-[#E79E1F] hover:bg-[#E79E1F]"
                  >
                    <span class="inline-block p-1 bg-[#E79E1F] rounded-full" />
                    <span>{{ item.status }}</span>
                  </button>

                  <button
                    v-else
                    class="btn text-black  btn-xs bg-[#F2F4F7] border-[#6C778B] hover:bg-[#6C778B]"
                  >
                    <span class="inline-block p-1 bg-black rounded-full" />
                    <span>{{ item.status }}</span>
                  </button>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <SharedPagination
      v-if="!newAccount"
      :item="filteredTxList.length"
      @slice-index="pagination"
    />
    <!-- NEW -->
    <DashboardAddNewAccount
      v-if="newAccount"
      class="center"
    />
  </div>
</template>
