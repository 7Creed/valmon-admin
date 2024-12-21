<script setup>
const props = defineProps({
  listing: Array,
})
</script>

<template>
  <div class="flex flex-wrap items-center gap-8">
    <MarketPlaceEmployerMarket
      type="profile"
      :other-listings="props.listing"
    />
  </div>
</template>
