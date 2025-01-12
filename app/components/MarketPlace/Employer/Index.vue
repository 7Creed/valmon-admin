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
      class="mt-10"
    >
      <div
        v-for="category in props.categories"
        :key="category.id"
        class="flex"
      >
        <div class="max-w-xs">
          <div
            class="bg-white p-3  rounded-l-[10px] text-center text-[#171616] font-semibold text-lg"
          >
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
        <div class="flex-1 bg-white">
          <div
            class="flex flex-row items-center justify-center flex-wrap gap-4 py-14 px-6 grow"
          >
            <!-- Skill placeholder -->
            <SkillPlaceHolder
              v-for="(service, index) in category.services"
              :key="index"
              :title="service.name"
              @click="selectSkill(service.name, category.name, service.id)"
              @back="backHome"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
