<script setup>
import location from '@/assets/icons/location.svg'
import { accountController } from '~/services/modules/account'

// Handle Image upload
// selected Image url
const draggedFile = ref(null)
const Image = ref(null)

function handleClick() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = ''
  input.onchange = (e) => {
    const file = (e.target).files?.[0]
    if (file) {
      Image.value = file
      const imgUrl = URL.createObjectURL(file)
      draggedFile.value = imgUrl
    }
  }
  input.click()
}
const { uploadProfilePicture } = accountController()
const loading = ref(false)
// emit signup event
const upload = async () => {
  loading.value = true // Set loading to true before making the request
  const formData = new FormData()
  formData.append('profile_pic', Image.value)
  console.log('this is the image ->', Image.value)
  // emit('registerEvent')
  const { data, error, status } = await uploadProfilePicture(formData)
  if (status.value === 'success') {
    loading.value = false
    handleALert('success', data.value.message)
    // takes to profile setup process
    // emit('setupProcess')
  }
  if (success.value === 'error') {
    loading.value = false
    handleALert('error', error.value.data.message)
  }
}

const addresses = reactive({
  addresses: [
    {
      details: null,
      street: 'nwaniba',
      city: 'uyo',
      state: 'akwa-ibom',
      country: 'nigeria',
      postal_code: '520101',
    },
  ],
})

const { addAddresses } = accountController()
const addressLoading = ref(false)
const handleAddAddress = async () => {
  addressLoading.value = true
  const { status, data, error } = await addAddresses(addresses)
  if (status.value === 'success') {
    buttonNext.value = 'Next'
    addressLoading.value = false
  }
  if (status.value === 'error') {
    handleError('error', error.value.data.message)
    addressLoading.value = false
  }
}

const emitEvent = (event) => {
  if (event === 'nextEvent' && buttonNext.value === 'Verify') {
    handleAddAddress()
  }
  else if (event === 'nextEvent' && buttonNext.value === 'Next') {
    emits('nextEvent')
  }
  else {
    emits(event)
  }
}
</script>

<template>
  <div class="flex flex-col">
    <h2 class="card-title text-[#232323] text-3xl mx-auto mb-2">
      Basic Profile Details
    </h2>
    <p class="text-[rgb(106,106,106)] text-lg  mx-auto mb-4">
      Your Details based on previous inputs
    </p>
    <div class="avatar mx-auto mb-6">
      <div class="w-24 rounded-full relative">
        <img
          v-if="draggedFile"
          :src="draggedFile"
          alt=""
        >
        <img
          v-else
          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
        >
      </div>
      <a
        href="javascript:void(0)"
        class="self-end"
        @click="handleClick"
      >
        <svg

          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.4"
            d="M11.6548 12.2105H1.66432C1.43676 12.2105 1.24805 12.0218 1.24805 11.7942C1.24805 11.5666 1.43676 11.3779 1.66432 11.3779H11.6548C11.8823 11.3779 12.071 11.5666 12.071 11.7942C12.071 12.0218 11.8823 12.2105 11.6548 12.2105Z"
            fill="#292D32"
          />
          <path
            opacity="0.4"
            d="M10.5573 1.93177C9.48058 0.855022 8.42603 0.827271 7.32153 1.93177L6.64995 2.60335C6.59444 2.65886 6.57224 2.74766 6.59445 2.82536C7.01626 4.29618 8.19292 5.47284 9.66374 5.89465C9.68594 5.9002 9.70814 5.90576 9.73034 5.90576C9.79139 5.90576 9.8469 5.88355 9.8913 5.83915L10.5573 5.16757C11.1068 4.62365 11.3732 4.09637 11.3732 3.56355C11.3788 3.01407 11.1124 2.48125 10.5573 1.93177Z"
            fill="#292D32"
          />
          <path
            d="M8.66424 6.39945C8.50328 6.32175 8.34788 6.24404 8.19802 6.15524C8.07592 6.08309 7.95936 6.00538 7.8428 5.92213C7.74845 5.86108 7.63744 5.77227 7.53199 5.68347C7.52089 5.67792 7.48204 5.64462 7.43764 5.60021C7.25448 5.44481 7.04912 5.245 6.86596 5.02299C6.84931 5.01189 6.82156 4.97303 6.78271 4.92308C6.7272 4.85648 6.63285 4.74547 6.54959 4.61782C6.48299 4.53456 6.40529 4.41246 6.33313 4.29035C6.24433 4.1405 6.16663 3.99064 6.08892 3.83523C6.01122 3.66872 5.95017 3.50777 5.89466 3.35791L2.4091 6.84347C2.33695 6.91562 2.27035 7.05438 2.2537 7.14874L1.95398 9.27448C1.89848 9.6519 2.00394 10.0071 2.23705 10.2458C2.43686 10.44 2.71437 10.5455 3.01408 10.5455C3.08068 10.5455 3.14729 10.5399 3.21389 10.5288L5.34519 10.2291C5.44509 10.2125 5.58385 10.1459 5.65045 10.0737L9.13601 6.58816C8.98061 6.53266 8.83075 6.4716 8.66424 6.39945Z"
            fill="#292D32"
          />
        </svg>
      </a>
    </div>
    <div
      class="flex gap-2 items-center text-[#62646A] text-xs w-1/2  mx-auto justify-center mb-8"
    >
      <img
        :src="location"
        alt="Location icon"
        class="h-5"
      >
      <span class="font-medium text-[rgba(0,0,0,1)] center gap-3">
        <span>Lagos, Nigeria</span>
        <a
          href="javascript:void(0)"
          onclick="my_modal_3.showModal()"
        >        <svg
          class="self-end"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            opacity="0.4"
            d="M11.6548 12.2105H1.66432C1.43676 12.2105 1.24805 12.0218 1.24805 11.7942C1.24805 11.5666 1.43676 11.3779 1.66432 11.3779H11.6548C11.8823 11.3779 12.071 11.5666 12.071 11.7942C12.071 12.0218 11.8823 12.2105 11.6548 12.2105Z"
            fill="#292D32"
          />
          <path
            opacity="0.4"
            d="M10.5573 1.93177C9.48058 0.855022 8.42603 0.827271 7.32153 1.93177L6.64995 2.60335C6.59444 2.65886 6.57224 2.74766 6.59445 2.82536C7.01626 4.29618 8.19292 5.47284 9.66374 5.89465C9.68594 5.9002 9.70814 5.90576 9.73034 5.90576C9.79139 5.90576 9.8469 5.88355 9.8913 5.83915L10.5573 5.16757C11.1068 4.62365 11.3732 4.09637 11.3732 3.56355C11.3788 3.01407 11.1124 2.48125 10.5573 1.93177Z"
            fill="#292D32"
          />
          <path
            d="M8.66424 6.39945C8.50328 6.32175 8.34788 6.24404 8.19802 6.15524C8.07592 6.08309 7.95936 6.00538 7.8428 5.92213C7.74845 5.86108 7.63744 5.77227 7.53199 5.68347C7.52089 5.67792 7.48204 5.64462 7.43764 5.60021C7.25448 5.44481 7.04912 5.245 6.86596 5.02299C6.84931 5.01189 6.82156 4.97303 6.78271 4.92308C6.7272 4.85648 6.63285 4.74547 6.54959 4.61782C6.48299 4.53456 6.40529 4.41246 6.33313 4.29035C6.24433 4.1405 6.16663 3.99064 6.08892 3.83523C6.01122 3.66872 5.95017 3.50777 5.89466 3.35791L2.4091 6.84347C2.33695 6.91562 2.27035 7.05438 2.2537 7.14874L1.95398 9.27448C1.89848 9.6519 2.00394 10.0071 2.23705 10.2458C2.43686 10.44 2.71437 10.5455 3.01408 10.5455C3.08068 10.5455 3.14729 10.5399 3.21389 10.5288L5.34519 10.2291C5.44509 10.2125 5.58385 10.1459 5.65045 10.0737L9.13601 6.58816C8.98061 6.53266 8.83075 6.4716 8.66424 6.39945Z"
            fill="#292D32"
          />
        </svg></a>
      </span>
    </div>

    <div class="flex gap-4 items-end justify-center ">
      <!-- Input -->
      <BaseInput
        label="First Name"
        type="text"
        placeholder="John"
        class="mb-6 "
      />
      <BaseInput
        label="Last Name"
        type="text"
        placeholder="doe"
        class="mb-6 "
      />
    </div>
    <label
      class="text-gray-500"
      for=""
    >About Me</label>
    <textarea
      placeholder="As an expert with over 20 years of experience, I've seen remarkable advancements in technology, making it more accessible and beneficial for everyday use."
      class="textarea textarea-bordered textarea-lg w-full"
    />
  </div>

  <!-- Open the modal using ID.showModal() method -->
  <dialog
    id="my_modal_3"
    class="modal"
  >
    <div class="modal-box">
      <h3 class="text-2xl font-bold center mb-4 text-[rgba(30, 30, 30, 1)]">
        Add Address
      </h3>

      <div class="w-full">
        <BaseInput
          v-model="addresses.addresses[0].postal_code"
          label="Postal Code"
          type="text"
          placeholder=""
          class="mb-4 "
        />
        <label class="form-control w-full  mb-4">
          <div class="label">
            <span class="label-text-alt text-base text-[#6E7191]">Country</span>
          </div>
          <select
            v-model="addresses.addresses[0].country"
            class="select select-bordered"
          >
            <option
              disabled
              selected
            >Pick one</option>

          </select>

        </label>
        <BaseInput
          v-model="addresses.addresses[0].state"
          label="State"
          type="text"
          placeholder=""
          class="mb-4 "
        />
        <BaseInput
          v-model="addresses.addresses[0].city"
          label="City"
          type="text"
          placeholder=""
          class="mb-4 "
        />
        <BaseInput
          v-model="addresses.addresses[0].street"
          label="Address"
          type="text"
          placeholder=""
          class="mb-4 "
        />
        <BaseInput
          v-model="addresses.addresses[0].details"
          label="Floor or apartment details"
          type="text"
          placeholder=""
          class="mb-4 "
        />

        <BaseButton
          title="Save Address"
          color="rgba(33, 31, 31, 1)"
          text-color="rgba(255, 255, 255, 1)"
          :outline="false"
          class="block w-full mb-5 mt-4"
          @click="toProfileSetup"
        />

        <div class="modal-action h-0">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">
              Close
            </button>
          </form>
        </div>
      </div>
    </div>
  </dialog>
</template>
