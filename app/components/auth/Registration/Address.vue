<script setup>
import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet'
import L from 'leaflet'
import { accountController } from '~/services/modules/account'

const emits = defineEmits(['nextEvent', 'prevEvent'])
const map = ref(null)

const lat = ref(47.21322)
const lng = ref(-1.559482)

const getUserLocation = async() => {
  if(navigator.geolocation) {

    // get location
    navigator.geolocation.getCurrentPosition(pos => {
      // set user location
    })
  }
}
// When the map is ready
const onMapReady = () => {
  // Access the Leaflet map instance
  console.log(map.value.leafletObject)
}
onMounted(() => {
  console.log(L)
  console.log(map.value.latLng)
})

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
          :loading="loading"
          :title="buttonNext"
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
        <h3 class="text-2xl font-bold mb-4 text-[rgba(30, 30, 30, 1)]">
          Add Address
        </h3>
        <label class="input input-bordered flex items-center gap-2 mb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>

          <input
            type="text"
            class="grow"
            placeholder="search for location"
          >
        </label>
        <LMap
          ref="map"
          style="height: 350px"
          :zoom="6"
          :center="[lat, lng]"
          :use-global-leaflet="true"
          @ready="onMapReady"
        >
          <LTileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
            layer-type="base"
            name="OpenStreetMap"
          />
          <LMarker :lat-lng="[50, 50]" draggable />
        </LMap>
        <p class="py-4 text-base">
          Floor or apartment details
        </p>
        <input
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full"
        >
        <p class="py-4 text-red-500 text-sm">
          Floor or apartment details are private and will not be visible to other users
        </p>
        <BaseButton
          title="Save Address"
          color="rgba(33, 31, 31, 1)"
          text-color="rgba(255, 255, 255, 1)"
          :outline="false"
          class="block w-full mb-5"
        />
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">
              Close
            </button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>
