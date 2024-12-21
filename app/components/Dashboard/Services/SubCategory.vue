<script setup>
import { useGlobalStore } from '@/store'
import { SKillsController } from '~/services/modules/Admin/skills'

const emit = defineEmits(['customer-events'])
const props = defineProps({
  categoryId: String,
})
const { subCategory } = SKillsController()

const store = useGlobalStore()

function goBackward() {
  store.$patch({
    viewParentSubCategory: false,
  })
}

const setViewSkill = (id) => {
  store.$patch({
    viewSkills: true,
  })
  emit('customer-events', id)
}

const subCategoryData = ref({})
const fetchSubCategory = async (id) => {
  try {
    const { status, data, error } = await subCategory(id)
    if (status.value === 'success') {
      subCategoryData.value = data.value.data
    }
    if (status.value === 'error') {
      handleALert('error', error)
    }
  }
  catch (error) {
    handleError(error)
  }
}
fetchSubCategory(props?.categoryId)
</script>

<template>
  <div>
    <BaseBackButton @click="goBackward()" />
    <DashboardTransaction
      :view-option="subCategory"
      type="sub-category"
      :transactions="subCategoryData"
      @custom-events="setViewSkill"
      :categoryId="categoryId"
    />
  </div>
</template>
