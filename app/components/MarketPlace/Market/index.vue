<script setup>
import { MarketplaceController } from '~/services/modules/marketplace'

const { getAppListing, getListingCategories, getFeaturedListings } = MarketplaceController()

// Get Listing category
const MLCategoryList = ref({})
const MFLCloader = ref(false)

// Fetch by category
const fetchMFLByCategory = async (category) => {
  MFLCloader.value = true
  const { status, data, error } = await getAppListing({ category })
  if (status.value === 'success') {
    MFLCloader.value = false
    // console.log('MFLC', data.value.data)
    if (data.value.data.length === 0 || !data.value.data) {
      return
    }
    else {
      console.log('Here')
      const categoryListings = data.value.data.data
      if (categoryListings.length) {
        const updated = MLCategoryList.value
        updated[category].Items.push(...categoryListings)
        MLCategoryList.value = updated
        // console.log(MLCategoryList.value)
      }
    }
  }
  if (status.value === 'error') {
    handleALert('error', error.value.data.message)
    MFLCloader.value = false
  }
}

const fetchMLCategoryList = async () => {
  MFLCloader.value = true
  const { status, data, error } = await getListingCategories()
  if (status.value === 'success') {
    MFLCloader.value = false
    // console.log('MFLs', data.value.data)
    const categoryData = {}
    // Assuming data.value.data is an array
    data.value.data.forEach((item) => {
      const { name, id } = item // Destructure from each item
      categoryData[id] = {
        name: name,
        id: id,
        Items: ref([]),
      }
      fetchMFLByCategory(id)
    })

    MLCategoryList.value = categoryData
  }
  if (status.value === 'error') {
    MFLCloader.value = false

    console.log(error.value)
  }
}

fetchMLCategoryList()

// Featured Listings
const MFListing = ref([])
const MFLoader = ref(false)
const fetchMFL = async () => {
  MFLoader.value = true
  const { status, data, error } = await getFeaturedListings()
  if (status.value === 'success') {
    MFLoader.value = false
    // console.log('MFL', data.value.data)
    MFListing.value = data.value.data
  }
  if (status.value === 'error') {
    MFLoader.value = false
    handleALert('error', error.value.data.message)
  }
}
fetchMFL()
</script>

<template>
  <!-- Hero -->
  <div class="py-20 px-4 lg:px-14 bg-[#F0F2F5]">
    <MarketPlaceMarketHero class="rounded-xl mb-16" />

    <!-- Featured Listings -->
    <SharedLoader v-if="MFLoader" />
    <div
      v-else
      class="w-full mx-auto"
    >
      <SharedAvailable
        v-if="!MFListing || MFListing.length === 0"
        message="Product"
      />
      <MarketPlaceMarketFeaturedListings
        v-else
        type="featuredListings"
        header-title="Featured Listings"
        :list-data="MFListing"
      />
    </div>
  </div>
  <!-- Renders featured category -->
  <div class="p-20 px-14 bg-[#F0F2F5]">
    <SharedLoader v-if="MFLCloader" />
    <div v-else>
      <div
        v-for="item in Object.values(MLCategoryList).slice(0, 3)"
        :key="item.id"
        class="w-full  mx-auto"
      >
        <MarketPlaceMarketFeaturedListings
          type="featuredListings"
          :header-title="item.name"
          :list-data="item.Items"
          class="mb-20"
        />
      </div>
    </div>
  </div>

  <div class="px-4 pb-14 pt-0 md:px-20 bg-[#F0F2F5]">
    <div class="w-full mx-auto relative">
      <MarketPlaceMarketSellOnValmon />
      <nuxt-link to="/addlisting">
        <BaseAddButton
          title="Add Listing"
          class="absolute right-0 "
        />
      </nuxt-link>
    </div>
  </div>
</template>
