<script setup>

</script>

<template>
  <!-- Attachment -->
  <div class="flex flex-wrap gap-10">
    <div
      v-for="(item, index) in 6"
      :key="index"
      class="text-[#6E7191]"
    >
      <h1 class="mb-2 satoshiM ">
        Upload Image
      </h1>
      <div class="border-dashed border-2 flex flex-col items-center justify-between p-4 border-[rgba(38,44,63,0.48)]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-20 mb-3"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
          />
        </svg>
        <div class="text-sm text-[#5B5B5B] mb-1">
          <span class="text-[#030359]">Select</span> Image you want to upload
        </div>
        <div class="text-[#949CA9]">
          Png and Jpg Allowed
        </div>
      </div>
    </div>
  </div>
</template>
