<script setup>
const Tab = ref('profile')
const toggleTab = (tab) => {
  Tab.value = tab
}
</script>

<template>
  <div>
    <div class="flex justify-between">
      <!-- Tab -->
      <div

        class="flex bg-white p-3 rounded-xl w-2/6 items-center justify-evenly mb-6"
      >
        <a
          href="javascript:void(0);"
          class="text-sm font-medium text-[#A0A3BD] satoshiM border-b-4 border-b-transparent"
          :class="{ border_b: Tab === 'profile' }"
          @click="toggleTab('profile')"
        >Basic Information</a>
        <a
          href="javascript:void(0);"
          class="text-sm font-medium text-[#A0A3BD] satoshiM border-b-4 border-b-transparent"
          :class="{ border_b: Tab === 'listings' }"
          @click="toggleTab('listings')"
        >Marketplace Listings</a>
      </div>
      <RouterLink to="/addlisting">
        <button
          v-show="Tab === 'listings'"
          class="btn btn-neutral"
        >
          Add Listing
        </button>
      </RouterLink>
    </div>
    <!-- Content -->
    <LazyMarketPlaceEmployerBasicInfo v-if="Tab === 'profile'" />
    <MarketPlaceEmployerMarketListingOnProfile v-if="Tab === 'listings'" />
  </div>
</template>
