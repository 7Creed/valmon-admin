<script setup>
// import { useGlobalStore } from '@/store/index'
import { useActiveView } from '@/composables/state'

// const store = useGlobalStore()
const { state } = useActiveView('activeView')

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

// Handle the name of the selected profile
const profileName = computed(() => state.value.isProfileName)
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
      <MarketPlaceEmployer
        v-if="activeComp === 'category'"
        @selected-option="handleSelectedOption"
      />
      <MarketPlaceEmployerSkills v-if="activeComp === 'skills'" />
    </main>
  </div>
</template>

<style></style>
