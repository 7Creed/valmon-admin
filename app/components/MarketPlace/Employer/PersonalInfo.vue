<script setup>
import { useGlobalStore } from '@/store'
import { accountController } from '~/services/modules/account'
import { servicesController } from '~/services/modules/services'

const store = useGlobalStore()
const { addGallery, addNewGig } = accountController()
const { getAppServices } = servicesController()

const Tab = ref('profile')
const toggleTab = (tab) => {
  store.fetchListing = false
  Tab.value = tab
}
onMounted(() => {
  if (store.fetchListing) {
    Tab.value = 'listings'
  }
})

const loading = ref(false)
const refreshV = ref(false)
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

const saveImage = async () => {
  loading.value = true
  const formData = new FormData()
  formData.append('image', Image.value)

  try {
    if (Image.value) {
      const { status, data, error } = await addGallery(formData)
      if (status.value === 'success') {
        handleALert('success', data.value.message)
        refreshV.value = true
      }
      if (status.value === 'error') {
        handleALert('error', error.value.data.message)
      }
    }
  }
  catch (error) {
    handleError(error)
  }
  finally {
    loading.value = false
    draggedFile.value = null
    Image.value = null
  }
}

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

// Handle Gigs
const GigsObj = reactive({
  service_id: null,
  title: '',
  pricing_type: '', // (per unit, per hour, per day, per session)
  price: null,
  description: '',
})

const GigsLoading = ref(false)
store.getAccount()
const addGig = reactive({
  gigs: [...(store.UserAccount.profile.gigs || [])],
})

watch(() => store.UserAccount.profile.gigs, (newVal) => {
  if (newVal) {
    addGig.gigs = [...newVal]
  }
}, { deep: true })

const updateGig = async () => {
  GigsLoading.value = true
  try {
    const { status, data, error } = await addNewGig(addGig)
    if (status.value === 'success') {
      handleALert('success', data.value.message)
      store.getAccount()
    }
    if (status.value === 'error') {
      handleALert('error', error.value.data.message)
    }
  }
  catch (error) {
    handleError(error)
  }
  finally {
    GigsLoading.value = false
  }
}
const saveEditGig = (index) => {
  addGig.gigs[index].service_id = GigsObj.service_id
  addGig.gigs[index].title = GigsObj.title
  addGig.gigs[index].pricing_type = GigsObj.pricing_type
  addGig.gigs[index].price = GigsObj.price
  addGig.gigs[index].description = GigsObj.description
  updateGig()
}
const gigIndex = ref(null)

const saveGig = async () => {
  GigsLoading.value = true
  addGig.gigs.push(GigsObj)
  console.log(addGig)
  if (edit.value === true) {
    saveEditGig(gigIndex.value)
  }
  else {
    try {
      const { status, data, error } = await addNewGig(addGig)
      if (status.value === 'success') {
        handleALert('success', data.value.message)
        store.getAccount()
      }
      if (status.value === 'error') {
        handleALert('error', error.value.data.message)
      }
    }
    catch (error) {
      handleError(error)
    }
    finally {
      GigsLoading.value = false
    }
  }
}

const deleteGig = (index) => {
  addGig.gigs.splice(index, 1)
  updateGig()
}

/**
 * Edit a gig. This function is called when the user wants to edit a gig.
 * The function takes one argument, `index`, which is the index of the gig in the array.
 * to update the gigs in the store.
 */

const edit = ref(false)
const gig = ref(null)
const editGig = (index) => {
  edit.value = true
  gigIndex.value = index
  if (gig.value && edit.value) {
    gig.value.click()
  }
}
</script>

<template>
  <div class="">
    <div class="flex justify-center  md:justify-between">
      <!-- Tab -->
      <div

        class="flex bg-white p-3 rounded-xl w-full lg:w-3/6 items-center  gap-4 md:justify-evenly mb-6"
      >
        <a
          href="javascript:void(0);"
          class="text-sm font-medium text-[#A0A3BD] satoshiM border-b-4 border-b-transparent"
          :class="{ border_b: Tab === 'profile' }"
          @click="toggleTab('profile')"
        >Basic Information</a>
        <a
          v-show="store.UserAccount?.account_type === 'worker'"
          href="javascript:void(0);"
          class="text-sm font-medium text-[#A0A3BD] satoshiM border-b-4 border-b-transparent"
          :class="{ border_b: Tab === 'gallery' }"
          @click="toggleTab('gallery')"
        >Work Gallery</a>
        <a
          v-show="store.UserAccount?.account_type === 'worker'"
          href="javascript:void(0);"
          class="text-sm font-medium text-[#A0A3BD] satoshiM border-b-4 border-b-transparent"
          :class="{ border_b: Tab === 'services' }"
          @click="toggleTab('services')"
        >Gigs</a>
        <a
          href="javascript:void(0);"
          class="text-sm font-medium text-[#A0A3BD] satoshiM border-b-4 border-b-transparent"
          :class="{ border_b: Tab === 'listings' }"
          @click="toggleTab('listings')"
        >Marketplace Listings</a>
      </div>
      <RouterLink
        to="/addlisting"
        class="fixed lg:block bottom-5 right-5 z-50"
      >
        <button
          v-show="Tab === 'listings'"
          class="btn btn-neutral"
        >
          Add Listing
        </button>
      </RouterLink>
      <button
        v-show="Tab === 'gallery' && store.UserAccount?.account_type === 'worker'"
        class="btn btn-neutral fixed lg:block bottom-5 right-5 z-50"
        onclick="my_modal_1.showModal()"
      >
        Add Image
      </button>
      <button
        v-show="Tab === 'services' && store.UserAccount?.account_type === 'worker'"
        ref="gig"
        class="btn btn-neutral fixed lg:block bottom-5 right-5 z-50"
        onclick="my_modal_3.showModal()"
      >
        Add Service
      </button>
    </div>
    <!-- Content -->
    <LazyMarketPlaceEmployerBasicInfo v-if="Tab === 'profile'" />
    <MarketPlaceEmployerMarketListingOnProfile v-if="Tab === 'listings'" />
    <MarketPlaceEmployerWorkGallery v-if="Tab === 'gallery'" />
    <MarketPlaceEmployerServices
      v-if="Tab === 'services'"
      type="settings"
      @delete-service="deleteGig($event)"

      @edit-service="editGig($event)"
    />
  </div>

  <!-- Add Gallery -->
  <dialog
    v-show="Tab === 'gallery' && store.UserAccount?.account_type === 'worker'"
    id="my_modal_1"
    class="modal"
  >
    <div class="modal-box">
      <a
        href="javascript:void(0)"
        class="text-black block mb-5"
      >
        <h1 class="satoshiB text-xl text-center mb-5 ">
          Upload Image
        </h1>
        <div
          class="border-dashed border-2 flex flex-col items-center justify-between p-4 border-[rgba(38,44,63,0.48)] "
          @click="handleClick"
        >
          <img
            v-if="draggedFile"
            :src="draggedFile"
            alt=""
            class="max-h-[400px]"
          >
          <svg
            v-if="!draggedFile"
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
          <div
            v-if="!draggedFile"
            class="text-sm text-[#5B5B5B] mb-1"
          >
            <span class="text-[#030359]">Select</span> Image you want to upload
          </div>
          <div
            v-if="!draggedFile"
            class="text-[#949CA9]"
          >
            Png and Jpg Allowed
          </div>
        </div>
      </a>
      <button
        class="btn btn-neutral text-white w-full"
        @click="saveImage"
      >
        <span
          v-if="loading"
          class="loading loading-spinner loading-md"
        />
        <span>   Upload Image</span>
      </button>
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

  <!-- Add Gigs -->

  <dialog
    id="my_modal_3"
    class="modal"
  >
    <div class="modal-box">
      <h3 class="text-2xl font-bold center mb-4 text-[rgba(30, 30, 30, 1)]">
        <span v-show="!edit"> Add Gig</span>
        <span
          v-show="edit"
          class="text-red-600"
        > Edit Gig</span>
      </h3>

      <div class="w-full">
        <label class="form-control w-full  mb-4">
          <div class="label">
            <span class="label-text-alt text-base text-[#6E7191]">Select Category</span>
          </div>
          <select
            v-model="GigsObj.service_id"
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
          v-model="GigsObj.title"
          label="Title"
          type="text"
          placeholder=""
          class="mb-4 "
        />
        <label class="form-control w-full  mb-4">
          <div class="label">
            <span class="label-text-alt text-base text-[#6E7191]">Pricing Type </span>
          </div>
          <select
            v-model="GigsObj.pricing_type"
            class="select select-bordered"
          >
            <option>per unit</option>
            <option> per hour</option>
            <option>per day</option>
            <option>per session</option>
          </select>
        </label>
        <BaseInput
          v-model="GigsObj.price"
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
        v-model="GigsObj.description"
        placeholder=""
        class="textarea textarea-bordered textarea-lg w-full "
      />
      <BaseButton
        :loading="GigsLoading"
        title="Add Gig"
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
