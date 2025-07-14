<script setup>
// Component

import Header from './Header.vue'
import SkillPlaceHolder from './SkillPlaceHolder.vue'
import { useGlobalStore } from '~/store'

const store = useGlobalStore()

const selectedOption = reactive({
  category: '',
  skill: '',
})
const emit = defineEmits(['selectedOption'])

const props = defineProps({
  categories: Array,
})

// Manage Selected Option (category and skill)
const selectSkill = (option, category, serviceId) => {
  selectedOption.category = category
  selectedOption.skill = option
  // Update selected service on the use state
  store.updateSelectedService(option)

  emit('selectedOption', selectedOption)
  store.$patch({
    usersByServices: serviceId,
  })
}

const sortByAlphabet = (list) => {
  const result = list;
  return result.sort((a,b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
  });
}

</script>

<template>
  <div>
    <Header />
    <SharedInfo
      v-if="props.categories.length === 0 && props.categories == null"
      message="Services"
      class="mt-3"
    />

    <section
      v-else
      class="mt-10 "
    >
      <!-- Search Results Message -->
      <div
        v-if="store.ServicesSearchedTerm && !loading"
        class="my-4 text-center"
      >
        <p class="text-lg font-medium">
          Showing results for: <span class="font-bold">{{ store.ServicesSearchedTerm
          }}</span>
        </p>
      </div>
      <div
        v-for="category in props.categories"
        :key="category.id"
        class="flex flex-wrap justify-center lg:justify-start"
      >
        <div class="max-w-xs">
          <div class="bg-white p-3   rounded-l-[10px] text-center text-[#171616] font-semibold text-lg">
            <h4 class="ms-3">
              {{ category.name }}
            </h4>
          </div>
          <div class="max-w-72 max-h-56 p-6">
            <img
              :src="category.image_url"
              :alt="category.name"
            >
          </div>
        </div>
        <div class="flex-1 bg-white mb-6 lg:mb-0">
          <div class="flex flex-row items-center justify-center flex-wrap gap-4 py-14 px-6 grow">
            <!-- Skill placeholder -->
            <SkillPlaceHolder
              v-for="(service, index) in sortByAlphabet(category.services)"
              :key="index"
              :title="service.name"
              :count="service.worker_count"
              @click="selectSkill(service.name, category.name, service.id)"
              @back="backHome"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
