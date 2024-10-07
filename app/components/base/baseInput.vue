<script setup>
const props = defineProps({
  label: String,
  type: String,
  validation: Boolean,
  required: Boolean,
  icon: Boolean,
  iconType: String,
  placeholder: String,
  data: Array,
  instanceId: String,
})

// default model with options
const inputValue = defineModel()

// HANDLE PASSWORD VISIBILITY
const passwordVisibility = ref(false)

const emits = defineEmits(['passwordVisible'])
const toggleVisibility = () => {
  if (props.instanceId) passwordVisibility.value = !passwordVisibility.value
  emits('passwordVisible', { visibility: passwordVisibility.value, id: props.instanceId })
}
</script>

<template>
  <div class="">
    <div v-if="props.type !=='select'">
      <div class="flex items-center justify-between">
        <label
          for="password"
          class="block text-base text-labels font-medium"
        >{{ props?.label }}</label>
      </div>

      <div class="relative flex items-center mt-2 mb-1">
        <button
          v-if="props?.icon && props.instanceId"
          class="absolute right-0 focus:outline-none"
          @click="toggleVisibility"
        >
          <!-- Password Icons -->
          <span v-if="props?.iconType ==='password'">
            <svg
              v-show="passwordVisibility === false"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 w-6 h-6 mx-4 text-gray-400 transition-colors duration-300 hover:text-gray-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
              />
            </svg>
            <svg
              v-show="passwordVisibility === true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6 w-6 h-6 mx-4 text-gray-400 transition-colors duration-300 hover:text-gray-500"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>

          </span>
        </button>

        <input
          v-model="inputValue"
          :type="props?.type"
          :required="props?.required"
          :placeholder="props?.placeholder"
          class=" block w-full py-2.5 text-[rgba(16, 16, 17, 1)] placeholder-gray-400/70 bg-white border border-[rgba(0, 0, 0, 0.4)] rounded-lg pl-5 pr-11 focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
        >
      </div>
      <p
        v-if="props?.validation"
        class="text-red-500 font-base"
      >
        <span> Not a valid {{ props?.label }} </span> <span v-if="props?.type === 'email'">address</span>
      </p>
    </div>

    <!-- SELECT -->
    <div v-if="props.type ==='select'">
      <div class="flex items-center justify-between mb-2">
        <label
          for="password"
          class="block text-base text-labels font-medium "
        >{{ props?.label }}</label>
      </div>
      <select
        v-model="inputValue"

        class="select select-bordered block w-full py-2.5 text-[rgba(16, 16, 17, 1)] placeholder-gray-400/70 bg-white border border-[rgba(0, 0, 0, 0.16)] rounded-lg pl-5 pr-11 focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
      >
        <option
          v-for="(option, key) in props.data"
          :key
          :value="option.dial_code"
        >
          {{ option.name + ' ' + option.dial_code }}
        </option>
      </select>
    </div>
  </div>
</template>

<style>
 /* validate entry */
  .incorrectEntry {
    @apply border-2 border-red-500 !important;
  }
  .correctEntry {
    @apply border-2 border-green-500 !important;
  }
</style>
