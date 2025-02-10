<script setup>
import { accountController } from '~/services/modules/account'
import { useGlobalStore } from '@/store'

const store = useGlobalStore()
const { singleListingCategory } = accountController()

const loader = ref(false)
const marketListings = ref([])
const fetchSingleListing = async (id) => {
  loader.value = true
  const { status, data, error } = await singleListingCategory(id)
  if (status.value === 'success') {
    // console.log(data.value.data)
    marketListings.value = data.value.data
    loader.value = false
  }
  if (status.value === 'error') {
    handleALert('error', error.value.data.message)
    loader.value = false
  }
}

fetchSingleListing(store.userIdForProfileCheck)

const startIndex = ref(0)
const endIndex = ref(14)
const pagination = (value) => {
  console.log(value)
  startIndex.value = value.start
  endIndex.value = value.end
}
</script>

<template>
  <SharedLoader v-if="loader" />
  <SharedAvailable
    v-if="!marketListings || marketListings.length === 0 && !loader"
    message="Listing"
  />
  <div
    v-else
    class="flex flex-wrap items-center gap-8"
  >
    <MarketPlaceEmployerMarket
      type="profile"
      :other-listings="marketListings?.slice(startIndex, endIndex)"
    />
  </div>
  <SharedPagination

    :item="marketListings?.length"
    @slice-index="pagination"
  />
</template>
