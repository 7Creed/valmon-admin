<script setup>
import { accountController } from '~/services/modules/account'

import { useGlobalStore } from '@/store'
// Define Data
const activeStep = ref(1)
const store = useGlobalStore()
// Function to update steps
const updateStep = (step) => {
  if (step === 'increase' && activeStep.value < 3) activeStep.value++
  if (step === 'decrease' && activeStep.value > 1) activeStep.value--
}

const { addListing } = accountController()
const loading = ref(false)
const postListing = async () => {
  loading.value = true
  const formData = new FormData()
  for (const key in store.listingData) {
    if (key === 'images') {
      store.listingData.images.forEach((image) => {
        formData.append('images[]', image)
      })
    }
    formData.append(key, store.listingData[key])
  }

  try {
    const { status, data, error } = await addListing(formData, store.listingData.listing_category_id, store.listingData.location)
    if (status.value === 'success') {
      console.log(data.value.data)
      handleALert('success', data.value.message)
      store.$patch({
        listing_category_id: '',
        location: '',
        title: '',
        color: '',
        price: '',
        negotiable: 1,
        condition: '',
        description: '',
        images: [],
      })
      store.fetchListing = true
      await navigateTo('/profilesetting')
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
</script>

<template>
  <div class="min-h-screen center bg-white">
    <div class="card bg-base-100 shadow-xl rounded-sm w-[90%] lg:w-3/6 mt-20 md:mt-0">
      <div class="card-body">
        <h3 class="text-xl font-bold text-center text-[#171616] mb-4 satoshiM">
          Add Listing ({{ activeStep }} of 3)
        </h3>

        <!-- Listing one -->
        <MarketPlaceEmployerAddListingOne
          v-if="activeStep === 1"
        />
        <MarketPlaceEmployerAddListingTwo
          v-if="activeStep === 2"
        />
        <MarketPlaceEmployerAddListingThree
          v-if="activeStep === 3"
          class="center"
        />
        <div class="flex items-center justify-between mt-4">
          <button
            v-if="activeStep > 1"
            class="btn btn-outline border-darkGold hover:bg-darkGold w-24"
            @click="updateStep('decrease')"
          >
            Back
          </button>

          <button
            v-if="activeStep < 3"
            class="btn btn-neutral text-white w-24 ms-auto"
            @click="updateStep('increase')"
          >
            Next
          </button>
          <button
            v-if="activeStep === 3"
            class="btn btn-neutral text-white w-24 ms-auto"
            @click="postListing()"
          >
            <span
              v-if="loading"
              class="loading loading-spinner loading-md"
            />
            <span v-else>Post</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
