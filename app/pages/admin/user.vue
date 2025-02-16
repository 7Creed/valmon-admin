<script setup>
import profile from '@/assets/icons/cardprofile.svg'
import { useGlobalStore } from '@/store'
import { UsersController } from '~/services/modules/Admin/users'

const { showAllUsers, deleteUser, getUsersSummary } = UsersController()

const store = useGlobalStore()

definePageMeta({
  layout: 'dashboard-layout',
})

const viewProfile = (id) => {
  store.$patch({
    adminUserId: id,
  })
  navigateTo('/profile')
}

// Loaders

const summary = ref({})
const Fetch = async (func, loader = null, alert = true) => {
  if (loader) loader.value = true
  const { status, data, error } = await func()
  if (status.value === 'success') {
    console.log(data.value.data)
    if (alert) handleALert('success', data.value.message)
    if (loader) loader.value = true
    switch (func) {
      case getUsersSummary:
        summary.value = data.value.data
        break
    }
  }
  if (status.value === 'error') {
    if (alert) handleALert('error', error.value.data.message)
    if (loader) loader.value = true
  }
}

const allUsersLoader = ref(false)
const allUsers = ref({})
const pagination = ref({})

const fetchAllUsers = async (page, perPage, search, pageUrl) => {
  try {
    allUsersLoader.value = true
    const { status, data, error } = await showAllUsers(page, perPage, search, pageUrl)
    if (status.value === 'success') {
      allUsersLoader.value = false
      allUsers.value = data.value.data.users
      pagination.value = data.value.data.pagination
    }
    if (status.value === 'error') {
      handleALert('error', error.value.message)
      allUsersLoader.value = false
    }
  }
  catch (error) {
    console.error(error)
  }
}

const removeUser = async (id) => {
  const { data, error, status } = await deleteUser(id)

  if (status.value === 'success') {
    handleALert('success', data.value.message)
    fetchAllUsers()
  }
  else if (status.value === 'error') {
    console.error('Delete User failed:', error.value.data.message)
  }
}

fetchAllUsers(1, 14, null, null)
Fetch(getUsersSummary)

/* ------------------------------- Pagination ------------------------------- */
const searchTerm = ref('')
const extractUrl = (url) => {
  const extractedUrl = url.split('admin/')
  return extractedUrl[1]
}
const paginate = (value) => {
  if (value === 'prev' && pagination.value.prev_page_url) {
    const url = extractUrl(pagination.value.prev_page_url)
    fetchAllUsers(null, null, null, url)
  }
  if (value === 'next' && pagination.value.next_page_url) {
    const url = extractUrl(pagination.value.next_page_url)
    fetchAllUsers(null, null, null, url)
  }
}

watch(searchTerm, (newVal, oldVal) => {
  if (newVal) {
    fetchAllUsers(1, 14, newVal, null)
  }
})
</script>

<template>
  <div class="text-card bg-primary_bg w-full p-10 px-8">
    <!-- Stats card -->
    <div class=" flex flex-wrap gap-6 mb-10">
      <DashboardStatsCard
        title="All Users"
        :value="summary?.total_users"
        :percentage="summary?.weekly_growth?.total_users"
        :icon="profile"
        icon-bg="bg-[#F45E5E1A]"
      />
      <DashboardStatsCard
        title="Service Providers"
        :value="summary?.service_providers"
        :percentage="summary?.weekly_growth?.service_providers"
        :icon="profile"
        icon-bg="bg-[#5E6DF41A]"
      />
      <DashboardStatsCard
        title="Normal Users"
        :value="summary?.employers"
        :percentage="summary?.weekly_growth?.employers"
        :icon="profile"
        icon-bg="bg-[#5EF4901A]"
      />
    </div>
    <!-- Table -->
    <div class="card card-compact bg-base-100 table_adjustment shadow-xl">
      <div class="card-body">
        <!-- Captions -->
        <div class="card-title justify-between border-b-[1.5px] pb-4 w-full">
          <!-- content 1 -->
          <div class="text-sm">
            <div class="mb-2">
              <span class="text-valmon_menu font-medium">Customers</span>
              <span class="inline-block text-valmon_Gold text-xs ms-3">{{ pagination?.total }} Registered</span>
            </div>
            <p>List Of All Customers on The Platform</p>
          </div>
          <!-- Content 2 -->
          <div class=" flex items-center flex-wrap gap-8 justify-between">
            <!-- Search -->
            <label class=" input input-bordered flex items-center gap-2 flex-1">
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
            <!-- <span class=" center gap-2">
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
            v-if="allUsersLoader"
            class="loading loading-spinner"
          />
          <table
            v-else
            class="table table-auto"
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
              <!-- Use this -->
              <tr
                v-for="(item, index) in allUsers"
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
                <td>{{ item.listings_count }}</td>
                <td>{{ formatDate(item.join_date) }}</td>
                <td>{{ item.reported_count ?? 0 }}</td>
                <td>{{ item.type }}</td>
                <td>{{ item.last_seen_at === 'Never' ? 'Never' : formatDate(item.last_seen_at) }}</td>
                <th>
                  <button
                    v-if="item.status === 'ACTIVE'"
                    class="btn text-[#364254]  btn-xs"
                  >
                    <span class="inline-block p-1 bg-[#6C778B] rounded-full" />
                    <span>{{ item.status }}</span>
                  </button>

                  <button
                    v-else
                    class="btn text-[#AD7A22]  btn-xs "
                  >
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
                    <li @click="viewProfile(item.id)">
                      <a

                        href="javascript:void(0)"
                      >View</a>
                    </li>
                    <li @click="removeUser(item.id)">
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
    <!-- pagination -->
    <div class="pagination flex flex-wrap gap-4 lg:gap-0 items-center mt-10 text-[#727376] ">
      <div class="join">
        <button
          class="join-item btn btn-sm bg-white"
          @click="paginate('prev')"
        >
          «
        </button>

        <button
          class="join-item btn btn-sm bg-white"
          @click="paginate('next')"
        >
          »
        </button>
      </div>
    </div>
  </div>
</template>
