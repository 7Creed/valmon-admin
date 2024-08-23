<script setup>
// Component

import Header from './Header.vue'
import SkillPlaceHolder from './SkillPlaceHolder.vue'

// Images
import technical from '@/assets/images/UIElements/skill.jpg'
import software from '@/assets/images/UIElements/software.jpg'
import services from '@/assets/images/UIElements/service.jpg'
import other from '@/assets/images/UIElements/other.png'

const categories = [
  { name: 'Technical Skills', id: 1, img: technical },
  { name: 'Software Skills', id: 2, img: software },
  { name: 'Service Skills', id: 3, img: services },
  { name: 'Other Skills', id: 4, img: other },
]

const selectedOption = reactive({
  category: '',
  skill: '',
})
const emit = defineEmits(['selectedOption'])
const selectSkill = (option, category) => {
  selectedOption.category = category
  selectedOption.skill = option
  emit('selectedOption', selectedOption)
}
</script>

<template>
  <div>
    <Header />
    <section class="mt-10">
      <div
        v-for="category in categories"
        :key="category.id"
        class=" flex"
      >
        <div class="max-w-xs">
          <div class="bg-white p-3 rounded-l-[10px] text-center text-[#171616] font-semibold text-lg">
            <h4 class="ms-3">
              {{ category.name }}
            </h4>
          </div>
          <div class="max-w-72 max-h-56 p-6">
            <img
              :src="category.img"
              :alt="category.name"
            >
          </div>
        </div>
        <div class="flex-1  bg-white">
          <div class="flex flex-row items-center justify-center flex-wrap gap-4 py-14 px-6 grow">
            <!-- Skill placeholder -->
            <SkillPlaceHolder
              v-for="(items, index) in 48"
              :key="index"
              title="Front-End"
              @click="selectSkill('Front-End', category.name)"
            />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
