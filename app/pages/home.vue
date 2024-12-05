<script setup>
// import { useGlobalStore } from '@/store/index'
import { useActiveView } from '@/composables/state'
import { categoryController } from '~/services/modules/category'
import { useGlobalStore } from '~/store'

import { authController } from '~/services/modules/auth'

const store = useGlobalStore()
const { ping } = authController()

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
  activeComp.value = 'category'
  selectedOption.category = ''
  selectedOption.skill = ''
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
    const { status, data, error } = await getCategory_Services()
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

onMounted(() => {
  store.getAccount()

  // Check if General History is true and set the History from user profile to true
  if (state.value.GeneralHistory) {
    activeComp.value = 'skills'
  }
})

const PingUser = async () => {
  console.log('Hello there!')
  const { data, error, status } = await ping()
  if (status.value === 'success') {
    console.log(data.value)
  }
  if (status.value === 'error') {
    console.log(error.value.data.message)
  }
}

PingUser()
// Ping user at every 30secs
setInterval(ping(), 30000)
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
        <li><a class="text-decoration-none">Category</a></li>
        <li
          v-if="selectedOption.category"
          @click="History()"
        >
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
        :skill="selectedOption.skill"
        @back-home="History()"
      />
    </main>
  </div>
</template>

<style></style>
