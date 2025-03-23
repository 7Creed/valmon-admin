<script setup>
const emits = defineEmits(['sliceIndex'])
const props = defineProps({
  item: Number,
})
// Pagination
const startIndex = ref(0)
const endIndex = ref(14)
const itemsPerPage = 14
const pagination = (value) => {
  console.log(value, props?.item)
  if (value == 'next' && endIndex.value < props?.item) {
    startIndex.value = endIndex.value
    endIndex.value = endIndex.value + itemsPerPage
    emits('sliceIndex', { start: startIndex.value, end: endIndex.value })
  }
  if (value == 'prev' && startIndex.value != 0) {
    startIndex.value = startIndex.value - itemsPerPage
    endIndex.value = endIndex.value - itemsPerPage
    emits('sliceIndex', { start: startIndex.value, end: endIndex.value })
  }
}
</script>

<template>
  <!-- pagination -->
  <div class="pagination flex flex-wrap gap-4 lg:gap-0 items-center mt-10 text-[#727376] w-2/4">
    <div class="join">
      <button
        class="join-item btn btn-sm bg-white"
        @click="pagination('prev')"
      >
        «
      </button>

      <button
        class="join-item btn btn-sm bg-white"
        @click="pagination('next')"
      >
        »
      </button>
    </div>
  </div>
</template>
