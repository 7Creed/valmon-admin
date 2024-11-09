<script setup>
import { accountController } from '~/services/modules/account'
import { servicesController } from '~/services/modules/services'

const emit = defineEmits(['BasicProfile'])
const { addNewGig } = accountController()
const { getAppServices } = servicesController()

// Fetch service category
const fetchData = ref([])
const fetchCategory = async () => {
  const { data, status } = await getAppServices()
  if (status.value === 'success' && data.value.data) {
    console.log('account', data.value.data)
    fetchData.value = data.value.data
  }
  if (status.value === 'error') {
    handleALert('error', error.value.data.message)
    console.log(error.value.data.message)
  }
}

// Function call
fetchCategory()
const addGig = reactive({
  gigs: [
    {
      service_id: null,
      title: '',
      pricing_type: '', // (per unit, per hour, per day, per session)
      price: null,
      description: '',
    },
  ],
})

const saveGig = async () => {
  try {
    const { status, data, error } = await addNewGig(addGig)
    if (status.value === 'success') {
      handleALert('success', data.value.message)
      emit('BasicProfile')
    }
    if (status.value === 'error') {
      handleALert('error', error.value.data.message)
    }
  }
  catch (error) {
    handleError(error)
  }
}
</script>

<template>
  <div class="flex flex-col gap-10">
    <div>
      <h2 class="text-[#232323] text-3xl font-bold mb-3">
        Add Gigs
      </h2>
      <p class="text-base text-[#6A6A6A]">
        Gigs are special offerings your create to make it easier for clients to hire you
      </p>
    </div>
    <p class="text-base text-[#6A6A6A] font-bold mx-auto">
      No Gig Added
    </p>
    <button
      class="btn mb-10 text-base font-bold text-[rgba(118, 127, 140, 1)] border-2 _border w-2/4 mx-auto"
      onclick="my_modal_3.showModal()"
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

      Add Gig
    </button>
  </div>

  <dialog
    id="my_modal_3"
    class="modal"
  >
    <div class="modal-box">
      <h3 class="text-2xl font-bold center mb-4 text-[rgba(30, 30, 30, 1)]">
        Add Gig
      </h3>

      <div class="w-full">
        <label class="form-control w-full  mb-4">
          <div class="label">
            <span class="label-text-alt text-base text-[#6E7191]">Select Category</span>
          </div>
          <select
            v-model="addGig.gigs[0].service_id"
            class="select select-bordered"
          >
            <option

              v-for="(item, index) in fetchData"
              :key="item.id"
              :value="item.id"
            >{{ item.name }}</option>

          </select>

        </label>
        <BaseInput
          v-model="addGig.gigs[0].title"
          label="Title"
          type="text"
          placeholder=""
          class="mb-4 "
        />
        <label class="form-control w-full  mb-4">
          <div class="label">
            <span class="label-text-alt text-base text-[#6E7191]">Pricing Type</span>
          </div>
          <select
            v-model="addGig.gigs[0].pricing_type"
            class="select select-bordered"
          >
            <option>per unit</option>
            <option> per hour</option>
            <option>per day</option>
            <option>per session</option>

          </select>
        </label>
        <BaseInput
          v-model="addGig.gigs[0].price"
          label="price"
          type="text"
          placeholder=""
          class=" mb-4"
        />
      </div>
      <label
        class=" text-base text-[#6E7191] "
        for=""
      >Description</label>
      <textarea
        v-model="addGig.gigs[0].description"
        placeholder=""
        class="textarea textarea-bordered textarea-lg w-full "
      />
      <BaseButton
        title="Add Service"
        color="rgba(33, 31, 31, 1)"
        text-color="rgba(255, 255, 255, 1)"
        :outline="false"
        class="block w-full mb-5 mt-4"
        @click="saveGig"
      />

      <div class="modal-action h-0">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button
            ref="closeMdal"
            class="btn"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  </dialog>
</template>
