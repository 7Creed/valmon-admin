<script setup>
const props = defineProps({
  color: String,
})
</script>

<template>
  <a
    href="javascript:void(0);"
    class="p-2 center bg-white navigation-circle rounded-full hover:bg-slate-100 "
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      :fill="props.color"
      class="size-5"
    >
      <path
        fill-rule="evenodd"
        d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
        clip-rule="evenodd"
      />
    </svg>
  </a>
</template>

<style>
.navigation-circle {
  width: fit-content;
}
</style>
