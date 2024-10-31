<script setup>
import { useGlobalStore } from '@/store'

const store = useGlobalStore()

const isNegotiable = ref(true)

watch(isNegotiable, (newVal, oldVal) => {
  if (newVal === true) {
    store.listingData.negotiable = 1
  }
  else {
    store.listingData.negotiable = 0
  }
})
</script>

<template>
  <div class="forms">
    <label class="form-control w-full mb-4">
      <div class="label">
        <span class="label-text text-base text-labels font-medium mb-1">Title</span>
        <span class="text-xl text-red-600 satoshiB">*</span>
      </div>
      <input
        v-model="store.listingData.title"
        type="text"
        placeholder="Type here"
        class="input input-bordered w-full  bg-[#EFEFEF]"
      >
    </label>
    <label class="form-control w-full mb-4 ">
      <div class="label">
        <span class="label-text text-base text-labels font-medium mb-1">Colour</span>
        <span class="text-xl text-red-600 satoshiB">*</span>
      </div>
      <input
        v-model="store.listingData.color"
        type="text"
        placeholder="Type here"
        class="input input-bordered w-full  bg-[#EFEFEF]"
      >
    </label>
    <label class="form-control w-full mb-4">
      <div class="label">
        <span class="label-text text-base text-labels font-medium mb-1">Price</span>
        <span class="text-xl text-red-600 satoshiB">*</span>
      </div>
      <input
        v-model="store.listingData.price"

        type="text"
        placeholder="Type here"
        class="input input-bordered w-full  bg-[#EFEFEF]"
      >
    </label>
    <div class="form-control">
      <label class="label cursor-pointer justify-start gap-4">
        <input
          type="checkbox"
          checked="checked"
          class="checkbox"
          @change="isNegotiable = !isNegotiable"
        >
        <span class="label-text">This Price Can Be Negotiated</span>
      </label>
    </div>
    <label class="form-control w-full mb-4 ">
      <div class="label">
        <span class="label-text text-base text-labels font-medium mb-1">Condition</span>
        <span class="text-xl text-red-600 satoshiB">*</span>
      </div>
      <input
        v-model="store.listingData.condition"

        type="text"
        placeholder="Type here"
        class="input input-bordered w-full  bg-[#EFEFEF]"
      >
    </label>
    <label class="form-control ">
      <div class="label">
        <span class="label-text">Description</span>
      </div>
      <textarea
        v-model="store.listingData.description"
        class="textarea textarea-bordered h-28  bg-[#EFEFEF]"
        placeholder="Type here"
      />
    </label>
  </div>
</template>
