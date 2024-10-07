<script setup>
import { accountController } from '~/services/modules/account'

const emits = defineEmits(['nextEvent', 'prevEvent'])

const props = defineProps({
  serviceData: Array,
})
// Handles the check box via the click of the button
const categoryId = ref(1)
const check = (id) => {
  categoryId.value = id
}

console.log('This is from service Data sent to primary', props?.serviceData)
const renderServiceData = ref(props.serviceData)

// Fix this
const selectPrimaryCategory = () => {
  renderServiceData.value[categoryId.value].primary = !renderServiceData.value[categoryId.value].primary
}

const primaryCategory = reactive({
  services: [],
})

const updatePrimaryData = () => {
  renderServiceData.value.map(e => primaryCategory.services.push(
    {
      service_id: e.service_id,
      years_of_experience: e.years_of_experience,
      primary: e.primary,
    },
  ))
}
const buttonOption = ref('Verify')
const { addServiceCategory } = accountController()
const loading = ref(false)
const savePrimaryCategory = async () => {
  loading.value = true
  updatePrimaryData()
  if (primaryCategory.services.length) {
    const { data, error, status } = await addServiceCategory(primaryCategory)
    console.log(data.value)
    if (status.value === 'success') {
      buttonOption.value = 'Next'
      loading.value = false
      handleALert('success', data.value.message)
    }
    if (status.value === 'error') {
      loading.value = false
      console.log(error.value)
      handleALert('error', error.value.data.message)
    }
  }
}

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
        @click="check(index)"
      >
        <span class="flex flex-row justify-between w-full">
          <span class="flex gap-2 items-center"><input
            v-model="renderServiceData[index].primary"
            type="checkbox"
            :checked="index === categoryId ?? ''"
            class="checkbox"
            @change="selectPrimaryCategory"
          ><span class="text-[rgba(105, 102, 113, 1)] text-lg font-bold">{{ category.name }}</span></span>
          <span class="text-[rgba(105, 102, 113, 1)] text-sm font-medium">Year of experience {{ category.years_of_experience }}</span>
        </span>
      </button>

      <div class="card-actions justify-between ">
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
          title="Next"
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
