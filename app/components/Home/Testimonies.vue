<script setup>

const props = defineProps({
  image: String,
  name: String,
  text: String,
})
</script>

<template>
  <div class="card card-compact p-4 border border-darkGold">
    <div class="">
      <figure class="flex mb-6">
        <img
          :src="props.image"
          :alt="props.name"
          class="w-full"
        >
      </figure>
      <div class="flex items-center gap-6 mb-2 text-center text-white">
        <!-- Profile desc -->
        <div class="text-white">
          <div class="text-sm  satoshiM mb-6">
            {{ props.text }}
          </div>
          <h3 class="mb-2 font-bold text-sm satoshiM">
           {{ props.name }}
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.tag, .archived {
  width: fit-content;
}
</style>
