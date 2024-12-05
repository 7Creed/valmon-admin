<script setup>
import { useGlobalStore } from '@/store'
import { accountController } from '~/services/modules/account'

const store = useGlobalStore()

const { getListingCategories } = accountController()
const ListingCategories = ref([])
const loading = ref(false)
const fetchListingCategories = async () => {
  loading.value = true
  const { status, data, error } = await getListingCategories()
  if (status.value === 'success') {
    ListingCategories.value = data.value.data
    console.log(data.value.data)
    loading.value = false
  }
  if (status.value === 'error') {
    handleError('error', error.value.data.message)
    loading.value = false
  }
}
fetchListingCategories()
console.log(store.UserAccount.profile.addresses)
</script>

<template>
  <div class="forms">
    <label class="form-control w-full mb-4 ">
      <div class="label">
        <span class="label-text text-base text-labels font-medium mb-1">Select Category</span>
        <span class="text-xl text-red-600 satoshiB">*</span>
      </div>
      <select
        v-model="store.listingData.listing_category_id"
        class="select select-bordered bg-[#EFEFEF]"
        required
      >
        <option
          disabled
          selected
        >Pick one</option>
        <option
          v-for="category in ListingCategories"
          :key="category.id"
          :value="category.id"
        >{{ category.name }}</option>
      </select>
    </label>
    <label class="form-control w-full">
      <div class="label">
        <span class="label-text text-base text-labels font-medium mb-1">Location</span>
        <span class="text-xl text-red-600 satoshiB">*</span>
      </div>
      <select
        v-model="store.listingData.location"

        class="select select-bordered bg-[#EFEFEF]"
        required
      >
        <option
          v-for="(address, index) in JSON.parse(store.UserAccount.profile.addresses)"
          :key="index"
        >{{ address.state }}, {{ address.country }}</option>

      </select>
    </label>
  </div>
</template>
