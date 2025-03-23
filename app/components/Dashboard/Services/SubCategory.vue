<script setup>
import { useGlobalStore } from '@/store'
import { SKillsController } from '~/services/modules/Admin/skills'

const emit = defineEmits(['customer-events'])
const props = defineProps({
  categoryId: String,
})
const { subCategory, deleteSC } = SKillsController()

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
const TxLoader = ref(true)
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
    console.log(error)
  }
  finally {
    TxLoader.value = false
  }
}
// Delete From List after checking update from the store

watch(() => store.Transaction.id, (newVal, oldVal) => {
  if (newVal && store.Transaction.key == 'subcategory') {
    deleteSubCategory(newVal)
  }
})
const deleteSubCategory = async (id) => {
  const { data, error, status } = await deleteSC(id)
  if (status.value === 'success') {
    handleALert('success', data.value.message)
    fetchSubCategory(props?.categoryId)
  }
  if (status.value === 'error') {
    console.log(error.value.message)
  }
}
watch(() => store.NewSubCategory, (newVal, oldVal) => {
  if (newVal == true) {
    fetchSubCategory(props?.categoryId)
  }
})
fetchSubCategory(props?.categoryId)
</script>

<template>
  <div>
    <BaseBackButton @click="goBackward()" />
    <DashboardTransaction
      :view-option="subCategory"
      type="sub-category"
      :transactions="subCategoryData"
      :category-id="categoryId"
      :tx-loader="TxLoader"
      @custom-events="setViewSkill"
    />
  </div>
</template>
