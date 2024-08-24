<script setup>

</script>

<template>
  <div class="flex flex-wrap items-center gap-8">
    <MarketPlaceEmployerMarket
      v-for=" (items, index) in 12"
      :key="index"
      :listings="true"
    />
  </div>
</template>
