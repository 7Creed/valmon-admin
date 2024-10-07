<script setup>
const props = defineProps({
  title: String,
  value: String,
  percentage: String,
  icon: String,
  iconBg: String,
})
const cardDetails = ['Tailor', 'Painter', 'Cleaner', 'Tailor', 'Painter', 'Cleaner', 'Tailor', 'Painter', 'Cleaner']
</script>

<template>
  <div class="card card-compact bg-base-100 w-80 shadow-xl">
    <div class="card-body gap-1">
      <h2 class=" text-sm mb-1">
        {{ props.title }}
      </h2>
      <div class="text-[#606060] flex flex-wrap text-sm font-semibold justify-between items-center gap-4">
        <div
          v-for="(category, index) in cardDetails"
          :key="index"
        >
          <span class="text-brightGold mr-2">{{ index + 1 }}.</span>
          <span>{{ category }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
