<script setup>
import { accountController } from '~/services/modules/account'
import { useGlobalStore } from '~/store'

const store = useGlobalStore()

const emits = defineEmits(['nextEvent', 'prevEvent'])

const props = defineProps({
  serviceData: {
    type: Array,
    required: true,
    default: () => [],
  },
})

console.log('This is from service Data sent to primary', props?.serviceData)
// For Updating the UI

const renderServiceData = ref([])

// Watch for changes in serviceData and update renderServiceData when data arrives
watch(() => props.serviceData, (newValue) => {
  if (newValue) {
    renderServiceData.value = newValue.map(item => ({ ...item }))
    // Set first item as primary if there are items
    if (renderServiceData.value.length > 0) {
      renderServiceData.value[0].primary = true
    }
  }
}, { immediate: true })

// This function updates the primary properties in renderServiceData
const selectPrimaryCategory = (index) => {
  renderServiceData.value = renderServiceData.value.map((item, i) => ({
    ...item,
    primary: i === index,
  }))
}

// Provides the api data for posting primary services
const primaryCategory = reactive({
  services: [],
})

const updatePrimaryData = () => {
  renderServiceData.value.map(e =>
    primaryCategory.services.push({
      service_id: e.service_id,
      years_of_experience: e.years_of_experience,
      primary: e.primary,
    }),
  )
}
// Variables
const buttonOption = ref('Verify')
const { addServiceCategory } = accountController()
const loading = ref(false)

// Handles API call
const savePrimaryCategory = async () => {
  loading.value = true
  updatePrimaryData()
  if (primaryCategory.services.length) {
    const { data, error, status } = await addServiceCategory(primaryCategory)
    if (status.value === 'success') {
      buttonOption.value = 'Next'
      loading.value = false
      handleALert('success', data.value.message)
      console.log('Update the store ->', 'Update the store ->')
      // Reset the service category store property when rendering the service category
      store.serviceCategory = []
    }
    if (status.value === 'error') {
      loading.value = false
      handleALert('error', error.value.data.message)
    }
  }
}

// Make api call and emit directional events for Next and Back Button
const emitEvent = (event) => {
  if (event === 'Verify') {
    savePrimaryCategory()
  }
  else if (event === 'prevEvent') {
    emits('prevEvent')
  }
  else {
    emits('nextEvent')
  }
}
</script>

<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title text-[rgba(35, 35, 35, 1)] font-bold text-3xl">
        Select Primary Category
      </h2>
      <p class="text-[rgba(106, 106, 106, 1)] text-lg mb-10">
        Primary category is the main service you offer
      </p>
      <button
        v-for="(category, index) in renderServiceData"
        :key="index"
        class="btn btn-block mb-5"
        @click="selectPrimaryCategory(index)"
      >
        <span class="flex flex-row justify-between w-full">
          <span class="flex gap-2 items-center"><input
            type="radio"
            :checked="category.primary"
            class="checkbox"
            name="primaryCategory"
          ><span class="text-[rgba(105, 102, 113, 1)] text-lg font-bold">{{
            category.name
          }}</span></span>
          <span class="text-[rgba(105, 102, 113, 1)] text-sm font-medium">Year of experience {{
            category.years_of_experience }}</span>
        </span>
      </button>

      <div class="card-actions justify-between">
        <BaseButton
          title="Back"
          color="rgba(255, 255, 255, 1)"
          text-color="#8B6914"
          border="#8B6914"
          :outline="true"
          class="block mb-5 w-[20%]"
          @click="emitEvent('prevEvent')"
        />
        <BaseButton
          :loading="loading"
          :title="buttonOption"
          color="rgba(33, 31, 31, 1)"
          text-color="rgba(255, 255, 255, 1)"
          border="#8B6914"
          :outline="false"
          class="block mb-5 w-[20%]"
          @click="emitEvent(buttonOption)"
        />
      </div>
    </div>
  </div>
</template>
