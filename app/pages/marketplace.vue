<script setup>
definePageMeta({
  layout: 'market-place',
})
</script>

<template>
  <div class="min-h-screen  bg-primary_bg pb-14">
    <!-- The Header -->
    <NavigationMarketplaceHeader class="" />
    <!-- Default View -->
    <div class="pt-14">
      <MarketPlaceMarket />
    </div>
  </div>
</template>

<style scoped></style>
