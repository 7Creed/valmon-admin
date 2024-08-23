<script setup>
import { useGlobalStore } from '@/store/index'

const store = useGlobalStore()

definePageMeta({
  layout: 'market-place',
})
// Handles breadcrumbs and Components rendering
const activeComp = ref('category')
const selectedOption = reactive({
  category: '',
  skill: '',
})

const handleSelectedOption = (option) => {
  selectedOption.category = option.category
  selectedOption.skill = option.skill
  activeComp.value = 'skills'
}
// Render the MarketPlaceEmployerWork component
watch(() => store.isProfileEnabled, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    activeComp.value = 'work'
  }
})
watch(() => store.isContactEnabled, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    activeComp.value = 'chat'
  }
})
</script>

<template>
  <div class="px-16 bg-primary_bg min-h-screen">
    <!-- BREADCRUMBS -->
    <div
      v-if="activeComp !=='chat'"
      class="breadcrumbs text-sm text-gray-500 mb-4"
    >
      <ul>
        <li><a class="">Home</a></li>
        <li><a class="">Category</a></li>
        <li v-if="selectedOption.category">
          <a class="">{{ selectedOption.category }}</a>
        </li>
        <li v-if="selectedOption.skill">
          <a :class="{ 'text-gray-900': store.profileName === '' }">{{ selectedOption.skill }}</a>
        </li>
        <li v-if="store.profileName !== ''">
          <a class="text-gray-900">{{ store.profileName }}</a>
        </li>
      </ul>
    </div>
    <main>
      <MarketPlaceEmployer
        v-if="activeComp === 'category'"
        @selected-option="handleSelectedOption"
      />
      <MarketPlaceEmployerSkills v-if="activeComp ==='skills'" />
      <MarketPlaceEmployerWork v-if="activeComp ==='work'" />
      <MarketPlaceEmployerChatPayment v-if="activeComp ==='chat'" />
    </main>
  </div>
</template>

<style></style>
