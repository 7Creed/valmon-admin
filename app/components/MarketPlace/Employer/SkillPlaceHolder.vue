<script setup>
const props = defineProps({
  title: String,
})
</script>

<template>
  <a
    href="javascript:void(0);"
    class="center px-5 py-3 border border-[rgba(36, 36, 36, 0.14)] rounded-lg bg-white hover:bg-darkGold flex- w-52"
  >
    <div class="skill-title text-sm font-medium text-center w-full">
      {{ props.title }}
    </div>
  </a>
</template>
