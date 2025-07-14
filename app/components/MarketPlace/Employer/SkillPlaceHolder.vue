<script setup>
const props = defineProps({
  title: String,
})
</script>

<template>
  <a
    href="javascript:void(0);"
    class="relative center px-5 py-3 border border-[rgba(36, 36, 36, 0.14)] rounded-lg bg-white hover:bg-darkGold hover:text-white flex- w-52 group"
  >
    <div class="skill-title text-sm font-medium text-center w-full">
      {{ props.title }}
    </div>
    <div class="h-[18px] px-[5px] hidden group-hover:flex text-[10px] aspect-square bg-black absolute -top-[0.2px] -right-[0.2px] rounded-tr-lg rounded-bl-lg justify-center items-center">
      50
    </div>
  </a>
</template>
