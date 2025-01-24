<script setup>
const props = defineProps({
  headerTitle: String,
  type: String,
  listData: Array,
})

const viewMore = async (id, name) => {
  console.log(id, name)
  await navigateTo({
    path: 'product',
    query: {
      name,
      id,
    },
  })
}
</script>

<template>
  <div class="featured">
    <h1 class=" font-extrabold text-xl md:text-2xl mb-7 satoshiM flex items-center justify-between">
      <span
        :class="[props.type === 'electronics' ? 'text-white': 'text-black']"
      >{{ props.headerTitle }}</span>
      <a
        v-show="props?.listData.length !== 0 && props?.listData && props?.headerTitle !== 'Featured Listings'"
        href="javascript:void(0)"
        class="text-darkGold lg:mr-[15rem] text-lg md:text-2xl"
        @click="viewMore(props?.listData[0].category.id, props?.listData[0].category.name)"
      >View More</a>
    </h1>
    <div class="flex flex-wrap gap-8 justify-center md:justify-start">
      <MarketPlaceEmployerMarket
        :type="props.type"
        :other-listings="props.listData"
      />
    </div>
  </div>
</template>
