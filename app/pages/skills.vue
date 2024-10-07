<script setup>
import { useGlobalStore } from '@/store'

const store = useGlobalStore()

definePageMeta({
  layout: 'dashboard-layout',
})

const Tab = ref('transaction')
const toggleTab = (tab) => {
  Tab.value = tab
}
</script>

<template>
  <div class="text-card bg-primary_bg w-full p-10 px-14">
    <div
      v-if="store.viewParentSubCategory === false"

      class="flex bg-white p-3 rounded-xl w-1/4 items-center justify-evenly mb-6"
    >
      <a
        href="javascript:void(0);"
        class="text-sm font-extrabold text-[#A0A3BD] satoshiM border-b-4 border-b-transparent"
        :class="{ border_b: Tab === 'transaction' }"
        @click="toggleTab('transaction')"
      >Skill Transactions</a>
      <a
        href="javascript:void(0);"
        class="text-sm font-medium text-[#A0A3BD] satoshiM border-b-4 border-b-transparent"
        :class="{ border_b: Tab === 'category' }"
        @click="toggleTab('category')"
      >Skill Parent Category</a>
    </div>
    <!-- Transaction  -->
    <DashboardTransaction v-if="Tab === 'transaction'" />
    <DashboardServices v-if="Tab === 'category'" />
  </div>
</template>

<style scoped>
.border_b {
  @apply text-darkGold border-b-darkGold pb-1
}
</style>
