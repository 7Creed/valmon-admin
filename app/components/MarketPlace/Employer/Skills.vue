<script setup>
import { servicesController } from '~/services/modules/services'
import { useGlobalStore } from '~/store'
import { MiscController } from '~/services/modules/misc'
import { onUnmounted } from 'vue'

const props = defineProps({
  page: {
    type: String,
    default: 'employer',
  },
  skill: String,
})
const emit = defineEmits(['backHome'])

const goBack = () => {
  if (filter.value === true) {
    filter.value = false
  }
  else {
    emit('backHome')
  }
}

// Handles tab

const activeTab = ref('job')
const toggleTab = (tab) => {
  activeTab.value = tab
}

// Handles Countries
const { getCountries } = MiscController()

const CountriesList = ref([])

const fetchCountries = async () => {
  const { data, error, status } = await getCountries()
  if (status.value === 'success')
    CountriesList.value = data.value.data
  if (status.value === 'error')
    console.log(error.value.data.message)
}
fetchCountries()

// Handles Filter
const filter = ref(false)

const filterOptions = reactive({
  country: '',
  rating: '',
})

const store = useGlobalStore()

const loading = ref(false)
const paginationInfo = ref({})
const { getUserByService } = servicesController()

const userByServices = ref([])
const getUsersByServices = async (id, query, location = '', rating = '') => {
  loading.value = true
  try {
    const { status, data, error } = await getUserByService(id, query, location, rating)
    if (status.value === 'success') {
      console.log(data.value.data)
      userByServices.value = data.value.data.results
      paginationInfo.value = data.value.data.pagination

      // currentPage.value = data.value.data.pagination.current_page
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
  }
}

const toggleFilter = () => {
  if (!filter.value) {
    filter.value = true
  }
  else {
    // Calls the Api for the filtered data
    getUsersByServices(store.usersByServices, store.usersByServiceCP, filterOptions.country, filterOptions.rating)
  }
}

// Handles Pagination

// First Call of the getUserByServices Api using the service id and pagination data
getUsersByServices(store.usersByServices, store.usersByServiceCP)

const pagination = (value) => {
  // Render The pagination contents
  handlePagination(value)
  let currPage = store.usersByServiceCP
  switch (value) {
    case 'prev' && currPage > 1:
      currPage--
      getUserByService(store.usersByServices, currPage)
      store.$patch({
        usersByServiceCP: currPage,
      })
      break
    case 'next' && currPage < paginationInfo.value.total:
      currPage++
      getUserByService(store.usersByServices, currPage)
      store.$patch({
        usersByServiceCP: currPage,
      })
      break

    default:
      getUserByService(store.usersByServices, value)

      break
  }
}

// Handles Pagination template Rendering
const paginationList = ref([1, 2, 3, 4])
const handlePagination = (value) => {
  const newPaginationList = []
  for (let items of paginationList.value) {
    if (value === 'next') {
      items++
      newPaginationList.push(items)
    }
    else if (value === 'prev') {
      items--
      newPaginationList.push(items)
    }
    else if (typeof value === Number) {
      const derivedPC = (value) - (paginationList[-1])
      const deriveItem = items + (derivedPC)
      newPaginationList.push(deriveItem)
    }
    else {
      return
    }
  }
  paginationList.value = newPaginationList
}

handlePagination(store.usersByServiceCP)

// Clear relevant state when component unmounts
onUnmounted(() => {
  store.clearState('usersByServices')
  store.clearState('usersByServiceCP')
  store.clearState('recipientObjNegotiation')
})
</script>

<template>
  <div>
    <!-- FILTER -->
    <div class="bg-[#211F1FFF] rounded-2xl py-3 px-4 mb-10 ">
      <div class="flex items-center gap-6">
        <SharedButton @click="goBack()" />
        <div
          v-if="filter === false"
          class="skill_container flex items-center justify-between  flex-1"
        >
          <div
            v-show="props.page === 'employer'"
            class="skill_header text-white"
          >
            <h2 class="text-lg font-semibold">
              {{ props.skill }}
            </h2>
            <p class="text-sm">
              {{ paginationInfo.total }} Registered
            </p>
          </div>
          <div
            v-show="props.page === 'favorite'"
            class="skill_header text-white"
          >
            <h2 class="text-lg font-semibold">
              Favourites
            </h2>
            <p class="text-sm">
              8 Saved
            </p>
          </div>
          <!-- search input -->
          <div class="rounded-lg ring-1 ring-darkGold focus:outline-none focus:ring-2 focus:ring-darkGold bg-white w-1/3">
            <label class="h-10 input input-bordered flex items-center gap-2 bg-inherit search">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#020617"
                class="size-5"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                  clip-rule="evenodd"
                />
              </svg>

              <input
                type="text"
                class="text-base text-slate-950"
                placeholder="Search here"
              >
            </label>
          </div>
          <!-- filter Button -->
          <button
            v-show="props.page === 'employer'"
            class="btn bg-brightGold px-5 py-3 w-36 flex items-center justify-between rounded-xl"
            @click="toggleFilter"
          >
            <p class="text-[#242424] text-base font-medium ">
              Filter List
            </p>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.4"
                d="M22 7.81V16.19C22 19.83 19.83 22 16.19 22H7.81C7.61 22 7.41 21.99 7.22 21.98C5.99 21.9 4.95 21.55 4.13 20.95C3.71 20.66 3.34 20.29 3.05 19.87C2.36 18.92 2 17.68 2 16.19V7.81C2 4.37 3.94 2.24 7.22 2.03C7.41 2.01 7.61 2 7.81 2H16.19C17.68 2 18.92 2.36 19.87 3.05C20.29 3.34 20.66 3.71 20.95 4.13C21.64 5.08 22 6.32 22 7.81Z"
                fill="#242424"
              />
              <path
                d="M8.16 6.6499H15.83C16.47 6.6499 16.99 7.1699 16.99 7.8099V9.0899C16.99 9.5599 16.7 10.1399 16.41 10.4299L13.91 12.6399C13.56 12.9299 13.33 13.5099 13.33 13.9799V16.4799C13.33 16.8299 13.1 17.2899 12.81 17.4699L12 17.9799C11.24 18.4499 10.2 17.9199 10.2 16.9899V13.9099C10.2 13.4999 9.97 12.9799 9.73 12.6899L7.52 10.3599C7.23 10.0799 7 9.5499 7 9.1999V7.8699C7 7.1699 7.52 6.6499 8.16 6.6499Z"
                fill="#242424"
              />
            </svg>
          </button>
          <div
            v-show="props.page === 'favorite'"
            role="tablist"
            class="tabs tabs-boxed bg-[#FFFFFF80]"
          >
            <a
              role="tab"
              class="tab  text-white"
              :class="{ 'tab-active': activeTab ==='job' }"
              @click="toggleTab('job')"
            >Job Listings</a>
            <a
              role="tab"
              class="tab  text-white"
              :class="{ 'tab-active': activeTab ==='market' }"
              @click="toggleTab('market')"
            >Market Listenings</a>
          </div>
        </div>
        <!-- more filter options -->
        <span
          v-if="filter === true"
          class="text-white text-lg font-semibold"
        >Filter</span>
      </div>
      <div
        v-if="filter === true"
        class="container mx-auto mt-4"
      >
        <div class="mb-4 flex justify-around">
          <!-- first column -->
          <div class="">
            <h3 class="text-white text-base font-semibold mb-2">
              Rating
            </h3>
            <div
              v-for="(items, index) in 5"
              :key="index"
              class="flex items-center gap-6"
            >
              <div
                class="form-control w-20"
              >
                <label class="label cursor-pointer">

                  <input
                    type="checkbox"
                    checked="checked"
                    class="checkbox border-white"
                  >
                  <span class="label-text text-white">{{ index + 1 }} Star</span>
                </label>
              </div>
              <div class="badge badge-white px-3 rounded-md">
                15678
              </div>
            </div>
          </div>
          <!-- second column -->
          <div class="hidden">
            <h3 class="text-white text-base font-semibold mb-2">
              Language
            </h3>
            <div
              v-for="(items, index) in 3"
              :key="index"
              class="flex items-center gap-6"
            >
              <div
                class="form-control w-20"
              >
                <label class="label cursor-pointer">

                  <input
                    type="checkbox"
                    checked="checked"
                    class="checkbox border-white"
                  >
                  <span class="label-text text-white">Hausa</span>
                </label>
              </div>
            </div>
          </div>
          <!-- Third column -->
          <div class="">
            <h3 class="text-white text-base font-semibold mb-2">
              Country
            </h3>
            <div
              class="flex items-center gap-6"
            >
              <div
                class="form-control "
              >
                <label class="label cursor-pointer gap-5">

                  <input
                    type="checkbox"
                    checked="checked"
                    class="checkbox border-white"
                  >
                  <select
                    v-model="filterOptions.country"
                    class="select select-bordered w-full max-w-xs "
                  >
                    <option
                      v-for="country in CountriesList"
                      :key="country.id"
                      :value="country.name"
                    >{{ country.name }}</option>
                  </select>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-end gap-3">
          <button class="btn btn-white border-red-600 text-red-500 text-base w-28">
            Reset
          </button>
          <button
            class="btn bg-brightGold  border-darkGold text-black text-base w-28"
            @click="toggleFilter"
          >
            Filter
          </button>
        </div>
      </div>
    </div>
    <section class=" container mx-auto pb-14">
      <!-- Client Card -->
      <div
        v-if="activeTab === 'job' || props.page === 'employer'"
        class="flex flex-wrap gap-6 mb-10"
      >
        <MarketPlaceEmployerClientCard
          :service-by-users="userByServices"
          :skill="props.skill"
        />
      </div>
      <div
        v-if="activeTab === 'market' && props.page === 'favorite'"
        class="flex flex-wrap gap-6 mb-10"
      >
        <MarketPlaceEmployerMarket
          v-for="(cards, index) in 16"

          :key="index"
        />
      </div>
      <div class="divider mb-1" />
      <div class="pagination flex items-center justify-between text-[#727376]">
        <div class="flex items-baseline w-[28rem] justify-between">
          <span class="text-sm">Number Of Items displayed per page</span>
          <select class="select select-bordered select-xs w-full max-w-14 bg-black text-white">
            <option>16</option>
          </select>
          <span class="text-sm">1-{{ userByServices.length }} of {{ pagination.total }} items</span>
        </div>
        <div class="join">
          <button
            class="join-item btn btn-sm"
            @click="pagination('prev')"
          >
            «
          </button>
          <button
            v-for="(item, index) of paginationList"
            :key="index"

            class="join-item btn bg-black text-white  btn-sm"
            g
            @click="pagination(item)"
          >
            {{ item }}
          </button>

          <span
            class="join-item btn  btn-sm"
          >
            ...
          </span>
          <button
            class="join-item btn  btn-sm"
            @click="pagination(paginationInfo.total)"
          >
            {{ paginationInfo.total }}
          </button>
          <button
            class="join-item btn  btn-sm"
            @click="pagination('next')"
          >
            »
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
.tab-active {
  background-color: #fff !important;
  color: black !important;
}
</style>
