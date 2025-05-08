<script setup>
import { MiscController } from '~/services/modules/misc'

definePageMeta({
  layout: 'market-place',
})

const { getFavorites } = MiscController()
const emit = defineEmits(['backHome'])

const goBack = () => {
  emit('backHome')
}
const activeTab = ref('job') // Default to 'job' tab
const toggleTab = (tab) => {
  activeTab.value = tab
}

const favoritesCount = computed(() => {
  if (activeTab.value === 'job') {
    return jobListings.value.length
  }
  if (activeTab.value === 'market') {
    return marketListings.value.length
  }
  return 0
})

const jobListings = ref([])
const marketListings = ref([])

const jobListingLoader = ref(false)
const marketListingLoader = ref(false)

const loader = (type, value) => {
  if (type === 'job') {
    jobListingLoader.value = value
  }
  if (type === 'listing') {
    marketListingLoader.value = value
  }
}

const getFavourites = async (type) => {
  const { data, status, error } = await getFavorites(type)
  loader(type, true)
  try {
    if (status.value === 'success') {
      console.log('Favourites:', data.value)
      if (type === 'listing') {
        marketListings.value = data.value.data
      }
      else {
        jobListings.value = data.value.data
      }
    }
    if (status.value === 'error') {
      console.error('Error fetching favourites:', error.value)
    }
  }
  catch (err) {
    console.error('Error fetching favourites:', err)
  }
  finally {
    loader(type, false)
  }
}
// Fetch the favourites when the component is mounted
getFavourites('user')
getFavourites('listing')

const searchQuery = ref('')

// Computed properties for filtered results
const filteredFavourite = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (activeTab.value == 'job') {
    if (!query) return jobListings.value

    return jobListings.value.filter(item =>
      item.first_name.toLowerCase().includes(query)
      || item.last_name.toLowerCase().includes(query),
    )
  }
  else {
    if (!query) return marketListings.value

    return marketListings.value.filter(item =>
      item.title.toLowerCase().includes(query)
      || item.category?.name.toLowerCase().includes(query),
    )
  }
})

// Pagination
const startIndex = ref(0)
const endIndex = ref(14)
const pagination = (value) => {
  console.log(value)
  startIndex.value = value.start
  endIndex.value = value.end
}
</script>

<template>
  <div class=" px-16 p-8 bg-primary_bg min-h-screen">
    <div>
      <!-- Header Section -->
      <div class="bg-[#211F1FFF] rounded-2xl py-3 px-4 mb-10">
        <div class="flex items-center gap-6">
          <SharedButton @click="goBack()" />
          <div class="skill_container flex items-center justify-between flex-1">
            <!-- Favorites Header -->
            <div class="skill_header text-white">
              <h2 class="text-lg font-semibold">
                Favourites
              </h2>
              <p class="text-sm">
                {{ favoritesCount }} Saved
              </p>
            </div>

            <!-- Search Input -->
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
                  v-model="searchQuery"
                  type="text"
                  class="text-base text-slate-950"
                  placeholder="Search favorites..."
                  @input="searchFavorites"
                >
              </label>
            </div>

            <!-- Tab Navigation -->
            <div
              role="tablist"
              class="tabs tabs-boxed bg-[#FFFFFF80]"
            >
              <a
                role="tab"
                class="tab text-white"
                :class="{ 'tab-active': activeTab === 'job' }"
                @click="toggleTab('job')"
              >
                Job Listings
              </a>
              <a
                role="tab"
                class="tab text-white"
                :class="{ 'tab-active': activeTab === 'market' }"
                @click="toggleTab('market')"
              >
                Market Listings
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Section -->
      <section class="container mx-auto pb-14">
        <!-- Content will go here based on activeTab -->
        <div
          v-if="activeTab === 'job'"
          class="flex flex-row gap-4"
        >
          <!-- Job Listings Content -->
          <MarketPlaceEmployerFavouritesJobListing
            :data="filteredFavourite.slice(startIndex, endIndex)"
            :loader="jobListingLoader"
            @delete-listing="getFavourites('user')"
          />
        </div>
        <div
          v-else
          class="flex flex-row gap-4"
        >
          <!-- Market Listings Content -->
          <MarketPlaceEmployerFavouritesMarketListing
            :data="filteredFavourite.slice(startIndex, endIndex)"
            :loader="marketListingLoader"
            @delete-listing="getFavourites('listing')"
          />
        </div>
      </section>
      <SharedPagination
        :item="filteredFavourite?.length"
        @slice-index="pagination"
      />
    </div>
  </div>
</template>

<style scoped>
.tab-active {
  background-color: #fff !important;
  color: black !important;
}

.search input {
  background: transparent;
  border: none;
  outline: none;
  width: 100%;
}
</style>
