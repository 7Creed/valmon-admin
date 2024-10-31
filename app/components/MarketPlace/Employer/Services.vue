<script setup>
import { useGlobalStore } from '@/store'
import { accountController } from '~/services/modules/account'

const store = useGlobalStore()
const loading = ref(false)
const { getUserServices } = accountController()
const userServices = ref([])
const fetchServices = async () => {
  loading.value = true
  try {
    const { status, data, error } = await getUserServices()
    if (status.value === 'success') {
      userServices.value = data.value.data
      console.log(data.value)
    }
    if (status.value === 'error') {
      handleError('error', error.value.data.message)
    }
  }
  catch (error) {
    handleError(error)
  }
  finally {
    loading.value = false
  }
}
fetchServices()
</script>

<template>
  <!-- Services -->
  <section>
    <div
      v-for="i in 6"
      class="card card-compact bg-base-100 shadow-md px-6 py-4 mb-6"
    >
      <!-- row -->
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="px-6 py-4 flex items-center gap-6">
          <div className="font-bold text-xl mb-2">
            Male Suit Top
          </div>
          <div class="flex-1">
            <div className="px-6 pt-2 pb-2 bg-[#FFF3D5] rounded-xl mb-3">
              <span className="inline-block text-sm font-semibold text-gray-700 mr-2 mb-2">
                <span>Title</span> <span class="satoshiM inline-block ml-2">Male Suit Top</span>
              </span>
              <span className="inline-block text-sm font-semibold text-gray-700 mr-2 mb-2">
                <span>Pricing Type</span> <span class="satoshiM inline-block ml-2">Per Unit</span>
              </span>
              <span className="inline-block text-sm font-semibold text-gray-700 mr-2 mb-2">
                <span>Price</span> <span class="satoshiM inline-block ml-2">NGN 14,000</span>
              </span>
            </div>
            <p className="text-gray-700 text-base ">
              Experience The Luxury Of A Custom-Made Suit Top Designed Specifically For You. I Will Take Your Exact Measurements And Work With You To Choose The Perfect Fabric, Style, And Details. Whether It's For A Formal Event, Business Meeting, Or A Special Occasion, I Ensure A Flawless Fit And A Polished, Professional Finish.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
