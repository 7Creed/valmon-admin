<script setup lang="ts">

</script>

<template>
  <div class="relative ">
    <NavigationMarketplace class="" />
    <NavigationMobileUser class="flex lg:hidden" />

    <div class="pt-[5rem] bg-primary_bg min-h-screen">
      <slot />
    </div>
    <Footer class="pt-10" />
  </div>
</template>
