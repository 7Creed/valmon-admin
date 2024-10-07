<script setup>
const props = defineProps({
  headerTitle: String,
  type: String,
})
</script>

<template>
  <div class="featured">
    <h1 class=" font-extrabold text-2xl mb-7 satoshiM flex items-center justify-between">
      <span
        :class="[props.type === 'electronics' ? 'text-white': 'text-black']"
      >{{ props.headerTitle }}</span>
      <a
        href="javascript:void(0)"
        class="text-darkGold mr-[15rem]"
      >View More</a>
    </h1>
    <div class="flex flex-wrap gap-8">
      <MarketPlaceEmployerMarket
        v-for="(items, index) in 5"
        :key="index"
      />
    </div>
  </div>
</template>
