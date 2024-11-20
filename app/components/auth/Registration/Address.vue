<script setup>
import { accountController } from '~/services/modules/account'
import { MiscController } from '~/services/modules/misc'
const emits = defineEmits(['nextEvent', 'prevEvent'])

const addresses = {
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
}

const { getCountries } = MiscController()
const buttonNext = ref('Verify')
const { addAddresses } = accountController()
const loading = ref(false)
const handleAddAddress = async () => {
  loading.value = true
  const { status, data, error } = await addAddresses(addresses)
  if (status.value === 'success') {
    buttonNext.value = 'Next'
    loading.value = false
  }
  if (status.value === 'error') {
    handleError('error', error.value.data.message)
    loading.value = false
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
const CountriesList = ref([])

const fetchCountries = async () => {
  const { data, error, status } = await getCountries()
  if (status.value === 'success')
    CountriesList.value = data.value.data
  if (status.value === 'error')
    console.log(error.value.data.message)
}
fetchCountries()
</script>

<template>
  <div class="card bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title text-[rgba(35, 35, 35, 1)] font-bold text-3xl">
        Address
      </h2>
      <p class="text-[rgba(106, 106, 106, 1)] text-lg mb-20">
        Add Physical locations of your business
      </p>
      <!-- Add address btn -->
      <button
        class="btn mb-10 text-base font-bold text-[rgba(118, 127, 140, 1)] border-2 _border"
        onclick="my_modal_1.showModal()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="rgba(118, 127, 140, 1)"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>

        Add Address
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
          :disabled="buttonNext === 'Verify'"
     
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
    <!-- Open the modal using ID.showModal() method -->
    <dialog
      id="my_modal_1"
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
              v-for="country in CountriesList"
              :key="country.id"
              :value="country.name"
            >{{ country.name }}</option>

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
            @click="emitEvent('nextEvent')"
                 :loading="loading"
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
  </div>
</template>
