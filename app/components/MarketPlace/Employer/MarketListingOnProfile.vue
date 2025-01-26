<script setup>

</script>

<template>
  <div class="flex flex-wrap items-center justify-center lg:justify-start gap-8">
    <MarketPlaceEmployerMarket
      :key="index"
      :listings="true"
      type="employerMarket"
    />
  </div>
</template>
