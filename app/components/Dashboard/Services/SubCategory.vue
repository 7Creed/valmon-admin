<script setup>
import { useGlobalStore } from '@/store'

const store = useGlobalStore()

function goBackward() {
  store.$patch({
    viewParentSubCategory: false,
  })
}

const setViewSkill = () => {
  store.$patch({
    viewSkills: true,
  })
}
</script>

<template>
  <div>
    <BaseBackButton @click="goBackward()" />
    <DashboardTransaction
      :view-option="subCategory"
      @custom-events="setViewSkill"
    />
  </div>
</template>
