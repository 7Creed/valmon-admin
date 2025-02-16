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

const percentageIncrease = (data) => {
  const percentage = parseInt(data)
  if (percentage >= 0) {
    return 'increased'
  }
  else if (percentage < 0) {
    return 'decreased'
  }
}
</script>

<template>
  <div class="card card-compact bg-base-100 w-[300px] dw-full shadow-xl">
    <template v-if="!props.secondCard">
      <div class="card-body gap-2 p-4 md:p-6">
        <!-- Title -->
        <h2 class="text-sm md:text-base">
          {{ props.title }}
        </h2>

        <!-- Value and Icon -->
        <div class="text-valmon_menu font-extrabold text-xl satoshiM flex items-center justify-between">
          <span>{{ props.value }}</span>
          <!-- Card SVG -->
          <div
            v-if="props.icon"
            class="w-14 h-14 flex items-center justify-center rounded-xl"
            :class="iconBg"
          >
            <img
              :src="props.icon"
              :alt="props.title"
              class="w-8 h-8"
            >
          </div>
        </div>

        <!-- Footer (Percentage) -->
        <div
          v-if="props.percentage && props.percentage !== 'N/A'"
          class="text-valmon_menu flex items-center gap-1"
        >
          <span
            class="flex items-center gap-1"
            :class="{ 'text-valmon_green': percentageIncrease(props.percentage) === 'increased', 'text-red-700': percentageIncrease(props.percentage) === 'decreased' }"
          >
            <svg
              v-if="percentageIncrease(props.percentage) === 'increased'"
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
            <svg
              v-else
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.3334 12.75L12.9555 11.12792L9.49883 8.67125L6.6655 11.50458L1.41675 5.2488L2.4155 4.25L6.6655 8.5L9.49883 5.66667L13.9613 10.12208L15.5834 8.5V12.75H11.3334Z"
                fill="#FF0000"
              />
            </svg>
            <span>{{ props.percentage }}%</span>
          </span>
          <span>Up from last week</span>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="card-body flex flex-col md:flex-row gap-4 items-center p-4 md:p-6">
        <!-- Card SVG -->
        <div
          v-if="props.icon"
          class="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-xl"
          :class="iconBg"
        >
          <img
            :src="props.icon"
            :alt="props.title"
            class="w-10 h-10"
          >
        </div>

        <!-- Title and Value -->
        <div class="text-gray-500 font-extrabold text-xl w-full">
          <h2 class="text-sm md:text-base mb-2 md:mb-4">
            {{ props.title }}
          </h2>
          <span class="text-black satoshiM"> {{ props.value }}</span>
        </div>

        <!-- Footer (Percentage) -->
        <div
          v-if="props.percentage"
          class="text-valmon_menu flex items-center gap-1 w-full"
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
