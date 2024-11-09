<script setup>
import archivedTick from '@/assets/icons/archive-tick.svg'
import Cake from '@/assets/images/UIElements/BlueCar.png'

const props = defineProps({
  listings: Array,

})
</script>

<template>
  <div v-for="(item, index) in props?.listings" :key="item.id" class="card card-compact bg-base-100 w-80 shadow-xl">
    <div class="absolute right-0 flex items-center gap-2">
      <a href="javascript:void(0);" class="archived p-2 bg-black rounded-full center ">
        <img :src="archivedTick" alt="favorite icon" class="w-5">
      </a>
    </div>

    <div class="card-body">
      <img :src="item.images[0]" alt="Shoes" class="h-[200px]">
      <div class="flex items-center gap-6 mb-2">
        <!-- Profile desc --> 
        <div>
         
          <div class="text-xs py-1 px-2 bg-gray-200 tag rounded-sm mb-2">
            <span class="text-black">{{item.title}}</span>
          </div>
          <h3 class="mb-2 text-[#24242] font-semibold text-sm">
            {{item.description}}
          </h3>
          <div class="text-lg text-[#242424] satoshiM">
            NGN {{ item.price }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.tag,
.archived {
  width: fit-content;
}
</style>
