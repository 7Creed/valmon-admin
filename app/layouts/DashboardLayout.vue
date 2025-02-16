<script setup>

</script>

<template>
  <div class="w-full">
    <NavigationDashboardNavigation />
    <div class="flex min-h-screen relative sidebarwithMian">
      <NavigationSideNavigation class=" w-[270px]" />
      <slot class="" />
    </div>
  </div>
</template>

<style scoped>
.sidebarwithMian {
  top: 100px ;
}
</style>
