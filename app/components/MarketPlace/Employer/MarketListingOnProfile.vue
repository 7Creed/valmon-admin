<script setup>
import { accountController } from '~/services/modules/account'

const { getListings } = accountController()

const marketListings = ref([])
const loader = ref(false)
const fetchListing = async () => {
  loader.value = true
  const { status, data, error } = await getListings()
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
fetchListing()

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
  <div
    v-else
    class="flex flex-wrap items-center justify-center lg:justify-start gap-8"
  >
    <SharedAvailable
      v-if="!marketListings || marketListings.length === 0"
      message="Listing"
    />
    <MarketPlaceEmployerMarket
      :listings="true"
      type="employerMarket"
      :other-listings="marketListings.slice(startIndex, endIndex)"
    />
  </div>
  <SharedPagination

    :item="marketListings?.length"
    @slice-index="pagination"
  />
</template>
