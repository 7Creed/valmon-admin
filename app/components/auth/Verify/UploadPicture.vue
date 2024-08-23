<script setup>
const emit = defineEmits(['prevEvent'])

const worker = ref(false)
onMounted(() => {
  const route = useRoute()
  if (route.path === '/worker') {
    worker.value = true
  }
})

const back = () => {
  emit('prevEvent')
}
</script>

<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2
        class="card-title text-[rgba(35, 35, 35, 1)] font-bold text-3xl"
        :class="{ 'mb-8': worker }"
      >
        Upload Profile Picture
      </h2>
      <p
        v-if="worker === false"
        class="text-[rgba(106, 106, 106, 1)] text-lg mb-5"
      >
        When would you be available for bookings
      </p>
      <!-- Avatar -->
      <div class="avatar mx-auto">
        <div class="w-24 rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp">
        </div>

        <a
          href="javascript:void(0);"
          class="p-1 bg-gradient-to-r from-brightGold to-darkGold navigation-circle rounded-full absolute bottom-[-15px] left-8"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="rgba(255, 255, 255, 1)"
            class="size-6"
          >
            <path
              fill-rule="evenodd"
              d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
              clip-rule="evenodd"
            />
          </svg>

        </a>
      </div>

      <div class="card-actions justify-between">
        <BaseButton
          title="Back"
          color="rgba(255, 255, 255, 1)"
          text-color="#8B6914"
          border="#8B6914"
          :outline="true"
          class="block mb-5 w-[20%]"
          @click="back()"
        />
        <BaseButton
          title="Done"
          color="rgba(33, 31, 31, 1)"
          text-color="rgba(255, 255, 255, 1)"
          border="#8B6914"
          :outline="false"
          class="block mb-5 w-[20%]"
        />
      </div>
    </div>
  </div>
</template>
