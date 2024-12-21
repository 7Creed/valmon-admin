<script setup>
import { SettingsController } from '~/services/modules/Admin/settings'

const { setPlatformRates, getPlatformRates } = SettingsController()

const rate = reactive({
  charge_percentage: 50,
  sale_percentage: 50,
})

const setRate = (event, type) => {
  const value = Number(event.target.value) // Ensure value is a number
  console.log('Value:', value, 'Type:', type) // Log for debugging
  rate[type] = value // Update the reactive property
}

const loader = ref(false)
const updateRate = async () => {
  loader.value = true
  const { data, error, status } = await setPlatformRates(rate)
  if (status.value === 'success') {
    loader.value = false
    fetchRate()
    handleALert('success', data.value.message)
  }
  if (status.value === 'error') {
    loader.value = false
    console.error('Update User failed:', error.value.data.message)
  }
}
const fetchRate = async () => {
  const { data, error, status } = await getPlatformRates()
  if (status.value === 'success') {
    rate.charge_percentage = data.value.data.charge_percentage
    rate.sale_percentage = data.value.data.sale_percentage
  }
  if (status.value === 'error') {
    console.error('fetch User rate failed:', error.value.data.message)
  }
}

fetchRate()
</script>

<template>
  <div class="card card-compact bg-base-100 w-2/4 shadow-xl">
    <div class="card-body">
      <div class="mb-10">
        <div class="text-black font-bold mb-4 flex justify-between items-center">
          <span> Skill Charge Percentage</span>
          <span class="text-brightGold font-bold satoshiM">16%</span>
        </div>
        <input
          v-model="rate.charge_percentage"
          type="range"
          min="0"
          max="100"
          class="range range-sm range-warning mb-2"
          step="1"
          @change="setRate($event, 'charge_percentage')"
        >
        <div class="flex w-full justify-between px-2 text-xs">
          <span
            v-for="(item) in 11 "
            :key="item"
          >{{ (item * 10) - 10 }}%</span>
        </div>
      </div>
      <div class="mb-16">
        <div class="text-black font-bold mb-4 flex justify-between items-center">
          <span> Listing Sale Percentage</span>
          <span class="text-brightGold satoshiM">16%</span>
        </div>
        <input
          v-model="rate.sale_percentage"
          type="range"
          min="0"
          max="100"
          class="range range-sm range-warning mb-2"
          step="1"
          @change="setRate($event, 'sale_percentage')"
        >
        <div class="flex w-full justify-between px-2 text-xs">
          <span
            v-for="(item) in 11 "
            :key="item"
          >{{ (item * 10) - 10 }}%</span>
        </div>
      </div>
      <BaseButton
        :loading="loader"
        title="Save Changes"
        color="black"
        text-color="rgba(255, 255, 255, 1)"
        :outline="false"
        class="block w-full mb-5"
        @click="updateRate"
      />
    </div>
  </div>
</template>
