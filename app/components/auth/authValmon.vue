<script setup>
import valmon from '@/assets/images/UIElements/valmon.png'

const props = defineProps({
  navigation: Boolean,
})
defineEmits(['btnEvent'])
</script>

<template>
  <div class="relative">
    <img
      :src="valmon"
      alt="Valmon WallPaper"
      class="w-full"
    >
    <a
      v-show="props.navigation"
      href="javascript:void(0);"
      class="p-2 bg-white navigation-circle rounded-full absolute top-6 left-6 hover:bg-slate-100"
      @click="$emit('btnEvent')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="size-5"
      >
        <path
          fill-rule="evenodd"
          d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
          clip-rule="evenodd"
        />
      </svg>
    </a>
  </div>
</template>

<style>
.navigation-circle {
  width: fit-content;
}
</style>
