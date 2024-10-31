<script setup>
// import { useGlobalStore } from '@/store/index'
import { useActiveView } from '@/composables/state'
import { categoryController } from '~/services/modules/category'
// const store = useGlobalStore()

definePageMeta({
  layout: 'market-place',
})

const { state } = useActiveView('activeView')

// Handles breadcrumbs and Components rendering
const activeComp = ref('category')
const selectedOption = reactive({
  category: '',
  skill: '',
})

const History = () => {
  activeCom.value = 'category'
}

const handleSelectedOption = (option) => {
  selectedOption.category = option.category
  selectedOption.skill = option.skill
  activeComp.value = 'skills'
}

// Handle the name of the selected profile
const profileName = computed(() => state.value.isProfileName)

const loading = ref(false)
const CategoryServices = ref([])
const { getCategory_Services } = categoryController()
const fetchCategoryServices = async () => {
  loading.value = true
  try {
    const { status, data, error } = await getCategory_Services ()
    if (status.value === 'success') {
      CategoryServices.value = data.value.data
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

fetchCategoryServices()
</script>

<template>
  <div class="px-16 bg-primary_bg min-h-screen">
    <!-- BREADCRUMBS -->
    <div
      v-if="activeComp !== 'chat'"
      class="breadcrumbs text-sm text-gray-500 mb-4"
    >
      <ul>
        <li><a class="">Home</a></li>
        <li><a class="">Category</a></li>
        <li v-if="selectedOption.category">
          <a class="">{{ selectedOption.category }}</a>
        </li>
        <li v-if="selectedOption.skill">
          <a :class="{ 'text-gray-900': profileName === '' }">{{ selectedOption.skill }}</a>
        </li>
        <li v-if="profileName !== ''">
          <a class="text-gray-900">{{ profileName }}</a>
        </li>
      </ul>
    </div>
    <main>
      <SharedLoader v-if="loading" />
      <MarketPlaceEmployer
        v-if="activeComp === 'category' && !loading"
        :categories="CategoryServices"
        @selected-option="handleSelectedOption"
      />
      <MarketPlaceEmployerSkills
        v-if="activeComp === 'skills' && !loading"
        @back="History()"
      />
    </main>
  </div>
</template>

<style></style>
