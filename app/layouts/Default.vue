<script setup lang="ts">
</script>

<template>
  <div class="relative">
    <Navigation class="hidden lg:block" />
    <NavigationMobileLanding class="flex lg:hidden"/>
    <div class="lg:pt-[6rem] bg-black">
      <slot />
    </div>
    <Footer />
  </div>
</template>
