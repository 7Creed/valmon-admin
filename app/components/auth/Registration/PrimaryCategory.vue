<script setup>
const emits = defineEmits(['nextEvent', 'prevEvent'])

const emitEvent = (event) => {
  emits(event)
}
// Handles the check box via the click of the button
const categoryId = ref(1)
const categoryData = [
  { name: 'Message Therapy', experience: 'Year of experience 3', id: 1 },
  { name: 'Tailoring', experience: 'Year of experience 3', id: 2 },
  { name: 'Message Therapy', experience: 'Year of experience 3', id: 3 },
]
const check = (id) => {
  categoryId.value = id
}
</script>

<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title text-[rgba(35, 35, 35, 1)] font-bold text-3xl">
        Select Primary Category
      </h2>
      <p class="text-[rgba(106, 106, 106, 1)] text-lg mb-10">
        Primary category is the main service you offer
      </p>
      <button
        v-for="category in categoryData"
        :key="category.id"
        class="btn btn-block mb-5"
        @click="check(category.id)"
      >
        <span class="flex flex-row justify-between w-full">
          <span class="flex gap-2 items-center"><input
            type="checkbox"
            :checked="category.id === categoryId ?? ''"
            class="checkbox"
          ><span class="text-[rgba(105, 102, 113, 1)] text-lg font-bold">{{ category.name }}</span></span>
          <span class="text-[rgba(105, 102, 113, 1)] text-sm font-medium">{{ category.experience }}</span>
        </span>
      </button>

      <div class="card-actions justify-between ">
        <BaseButton
          title="Back"
          color="rgba(255, 255, 255, 1)"
          text-color="#8B6914"
          border="#8B6914"
          :outline="true"
          class="block mb-5 w-[20%]"
          @click="emitEvent('prevEvent')"
        />
        <BaseButton
          title="Next"
          color="rgba(33, 31, 31, 1)"
          text-color="rgba(255, 255, 255, 1)"
          border="#8B6914"
          :outline="false"
          class="block mb-5 w-[20%]"
          @click="emitEvent('nextEvent')"
        />
      </div>
    </div>
  </div>
</template>
