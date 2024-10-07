<script setup>

</script>

<template>
  <div>
    <NavigationDashboardNavigation />
    <div class="flex min-h-screen w-full relative sidebarwithMian">
      <NavigationSideNavigation class="" />
      <slot />
    </div>
  </div>
</template>

<style scoped>
.sidebarwithMian {
  top: 100px ;
}
</style>
