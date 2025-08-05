<script setup>
const emit = defineEmits(['BasicProfile'])

const props = defineProps({
  data : Object
})
// Handle address addition
const userBio = reactive({
  bio: props?.data?.bio || '',
  // first_name: 'James',
  // last_name: 'John',
})

watch(userBio, (newVal, oldVal) => {
  emit('BasicProfile', newVal)
}, { deep: true })
</script>

<template>
  <div class="flex flex-col  sm:w-[500px]">
    <h2 class="card-title text-left text-[#232323] text-3xl  mb-10">
      About Me
    </h2>

    <textarea
      v-model="userBio.bio"
      placeholder="As an expert with over 20 years of experience, I've seen remarkable advancements in technology, making it more accessible and beneficial for everyday use."
      class="textarea textarea-bordered textarea-lg w-full"
      rows="10"
      maxlength="1500"
    />
  </div>
</template>
