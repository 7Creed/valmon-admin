<script setup>
const props = defineProps({
  title: String,
  value: String,
  percentage: String,
  icon: String,
  secondCard: Boolean,
  iconBg: String,
})

const iconBg = ref(props.iconBg)
</script>

<template>
  <div class="card card-compact bg-base-100  shadow-xl">
    <template v-if="!props.secondCard">
      <div class="card-body gap-1 w-80">
        <h2 class=" text-sm">
          {{ props.title }}
        </h2>
        <div class="text-valmon_menu font-extrabold  text-xl satoshiM flex items-center justify-between ">
          <span> {{ props.value }}</span>
          <!-- Card SVG -->
          <div
            v-if="props.icon"
            class="w-14 h-14 center rounded-xl"
            :class="iconBg"
          >
            <img
              :src="props.icon"
              :alt="props.title"
            >
          </div>
        </div>
        <!-- footer -->
        <div
          v-if="props.percentage"
          class=" text-valmon_menu flex items-center gap-1 w-full"
        >
          <span class="text-valmon_green flex items-center gap-1">
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.3334 4.25L12.9555 5.87208L9.49883 9.32875L6.6655 6.49542L1.41675 11.7512L2.4155 12.75L6.6655 8.5L9.49883 11.3333L13.9613 6.87792L15.5834 8.5V4.25H11.3334Z"
                fill="#00B69B"
              />
            </svg>
            <span>{{ props.percentage }}%</span>
          </span>
          <span>Up from last week</span>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="card-body flex-row  gap-4 items-center w-full">
        <!-- Card SVG -->
        <div
          v-if="props.icon"
          class="w-1/2 center py-3 rounded-xl "
          :class="iconBg"
        >
          <img
            :src="props.icon"
            :alt="props.title"
          >
        </div>
        <div class="text-gray-500 font-extrabold  text-xl  w-full">
          <h2 class=" text-sm mb-4">
            {{ props.title }}
          </h2>
          <span class="text-black satoshiM"> {{ props.value }}</span>
        </div>
        <!-- footer -->
        <div
          v-if="props.percentage"
          class=" text-valmon_menu fle items-center gap-1 w-full"
        >
          <span class="text-valmon_green flex items-center gap-1">
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.3334 4.25L12.9555 5.87208L9.49883 9.32875L6.6655 6.49542L1.41675 11.7512L2.4155 12.75L6.6655 8.5L9.49883 11.3333L13.9613 6.87792L15.5834 8.5V4.25H11.3334Z"
                fill="#00B69B"
              />
            </svg>
            <span>{{ props.percentage }}%</span>
          </span>
          <span>Up from last week</span>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
</style>
