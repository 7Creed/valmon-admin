<script setup lang="ts">
</script>

<template>
  <div class="relative">
    <Navigation class="hidden lg:block" />
    <NavigationMobile class="flex lg:hidden"/>
    <div class="lg:pt-[6rem] bg-black">
      <slot />
    </div>
    <Footer />
  </div>
</template>
