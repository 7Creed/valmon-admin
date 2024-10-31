<script setup>
import { useGlobalStore } from '@/store'
import { accountController } from '~/services/modules/account'

const store = useGlobalStore()

const Tab = ref('profile')
const toggleTab = (tab) => {
  store.fetchListing = false
  Tab.value = tab
}
onMounted(() => {
  if (store.fetchListing) {
    Tab.value = 'gallery'
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

const { addGallery } = accountController()

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
</script>

<template>
  <div class="">
    <div class="flex justify-between">
      <!-- Tab -->
      <div

        class="flex bg-white p-3 rounded-xl w-3/6 items-center justify-evenly mb-6"
      >
        <a
          href="javascript:void(0);"
          class="text-sm font-medium text-[#A0A3BD] satoshiM border-b-4 border-b-transparent"
          :class="{ border_b: Tab === 'profile' }"
          @click="toggleTab('profile')"
        >Basic Information</a>
        <a
          v-show="store.User?.account_type === 'worker'"
          href="javascript:void(0);"
          class="text-sm font-medium text-[#A0A3BD] satoshiM border-b-4 border-b-transparent"
          :class="{ border_b: Tab === 'gallery' }"
          @click="toggleTab('gallery')"
        >Work Gallery</a>
        <a
          v-show="store.User?.account_type === 'worker'"
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
      <RouterLink to="/addlisting">
        <button
          v-show="Tab === 'listings'"
          class="btn btn-neutral"
        >
          Add Listing
        </button>
      </RouterLink>
      <button
        v-show="Tab === 'gallery' && store.User?.account_type === 'worker'"
        class="btn btn-neutral"
        onclick="my_modal_1.showModal()"
      >
        Add Image
      </button>
      <button
        v-show="Tab === 'services' && store.User?.account_type === 'worker'"
        class="btn btn-neutral"
        onclick="my_modal_3.showModal()"
      >
        Add Service
      </button>
    </div>
    <!-- Content -->
    <LazyMarketPlaceEmployerBasicInfo v-if="Tab === 'profile'" />
    <MarketPlaceEmployerMarketListingOnProfile v-if="Tab === 'listings'" />
    <MarketPlaceEmployerWorkGallery v-if="Tab === 'gallery'" />
    <MarketPlaceEmployerServices v-if="Tab === 'services'" />
  </div>

  <dialog
    v-show="Tab === 'gallery' && store.User?.account_type === 'worker'"
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
</template>
