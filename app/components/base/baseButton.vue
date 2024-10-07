<script setup>
const props = defineProps({
  title: String,
  color: String,
  textColor: String,
  border: String,
  outline: Boolean,
  alt: String,
  src: String,
  type: String,
  loading: Boolean,
})

const bg = ref(props.color)
const textColor = ref(props.textColor)
const border = ref(props.border)
</script>

<template>
  <button
    class="btn text-base satoshiB bottom-2 flex items-center"
    :class="[props.outline ? 'btn_outline' : 'bg_btn']"
    :type="props.type ?? 'button'"
  >
    <span
      v-if="props?.loading"
      class="loading loading-spinner loading-md"
    />
    <span v-if="!props?.loading"> {{ props?.title }}</span>
    <img
      v-if="props.alt && !props?.loading"
      :src="props.src"
      :alt="props.alt"
      class="ms-1"
    >
  </button>
</template>

<style>
.bg_btn {
  background-color: v-bind(bg);
  color: v-bind(textColor);
}

.btn_outline {
  border: 1px solid;
  background-color: v-bind(bg);
  border-color: v-bind(border);
  color: v-bind(textColor);
}
</style>
