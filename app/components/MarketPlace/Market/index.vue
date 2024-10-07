<script setup>

</script>

<template>
  <!-- Hero -->
  <div class="py-20 px-14 bg-[#F0F2F5]">
    <MarketPlaceMarketHero class="rounded-xl mb-16" />

    <!-- Featured Listings -->
    <div class="w-full mx-auto">
      <MarketPlaceMarketFeaturedListings
        type="featuredListings"
        header-title="Featured Listings"
      />
    </div>
  </div>
  <!-- Electronics -->
  <div class="py-20 px-14 bg-[#1A1A1A] ">
    <div class="w-full mx-auto">
      <MarketPlaceMarketFeaturedListings
        type="electronics"
        header-title="Electronics"
      />
    </div>
  </div>

  <div class="p-20 px-14 bg-[#F0F2F5]">
    <div class="w-full  mx-auto">
      <!-- Cars -->
      <MarketPlaceMarketFeaturedListings
        type="cars"
        header-title="Cars"
        class="mb-20"
      />
      <!-- Furniture -->
      <MarketPlaceMarketFeaturedListings
        type="furniture"
        header-title="Furniture"
        class="mb-20"
      />

      <!-- Fashion -->
      <MarketPlaceMarketFeaturedListings
        type="fashion"
        header-title="Fashion"
        class="mb-20"
      />
    </div>
  </div>

  <div class="p-20 pt-0 bg-[#F0F2F5]">
    <div class="w-[90%] mx-auto relative">
      <MarketPlaceMarketSellOnValmon />
      <BaseAddButton
        title="Add Listing"
        class="absolute right-[-60px]"
      />
    </div>
  </div>
</template>
