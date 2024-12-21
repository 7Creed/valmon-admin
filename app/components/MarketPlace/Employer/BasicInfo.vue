<script setup>
import location from '@/assets/icons/location.svg'
import copysuccess from '@/assets/icons/copy-success.svg'

import { useGlobalStore } from '@/store'

import { accountController } from '~/services/modules/account'
import { MiscController } from '~/services/modules/misc'

const { getCountries } = MiscController()

const store = useGlobalStore()
const { UpdateProfile } = accountController()

store.getAccount()

// selected Image url
const draggedFile = ref(null)
const Image = ref(null)
const profile_loading = ref(false)
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

// emit signup event
const upload = async () => {
  profile_loading.value = true // Set loading to true before making the request
  const formData = new FormData()
  formData.append('profile_pic', Image.value)
  console.log('this is the image ->', Image.value)
  // emit('registerEvent')
  const { data, error, status } = await uploadProfilePicture(formData)
  if (status.value === 'success') {
    profile_loading.value = false
    handleALert('success', data.value.message)
    store.getAccount()
  }
  if (success.value === 'error') {
    profile_loading.value = false
    handleALert('error', error.value.data.message)
  }
}

const userBio = reactive({
  first_name: store.UserAccount?.first_name,
  last_name: store.UserAccount?.last_name,
  bio: '',
})
const bioLoading = ref(false)

const updateBio = async () => {
  bioLoading.value = true
  try {
    const { status, data } = await UpdateProfile(userBio)
    if (status.value === 'success') {
      handleALert('success', data.value.message)
      store.getAccount()
    }
    if (status.value === 'error') {
      handleALert('error', 'Unable to fetch Account Information')
    }
  }
  catch (error) {
    handleError(error)
  }
  finally {
    bioLoading.value = false
  }
}

const userAddress = reactive({
  details: null,
  street: 'nwaniba',
  city: 'uyo',
  state: 'akwa-ibom',
  country: 'nigeria',
  postal_code: '520101',
})
const address = {
  addresses: [
    ...(store.UserAccount.profile.addresses || [])],
}

watch(() => store.UserAccount.profile.addresses, (newVal) => {
  if (newVal) {
    address.addresses = [...newVal]
  }
}, { deep: true })

const { addAddresses } = accountController()
const addressLoading = ref(false)
const handleAddAddress = async () => {
  addressLoading.value = true
  address.addresses.push(userAddress)
  const { status, data, error } = await addAddresses(address)
  if (status.value === 'success') {
    handleALert('success', data.value.message)
    addressLoading.value = false
    store.getAccount()
  }
  if (status.value === 'error') {
    handleError('error', error.value.data.message)
    addressLoading.value = false
  }
}

// Handle User Location
const userLocation = computed(() => {
  if (store.UserAccount?.profile?.addresses) {
    const address = JSON.parse(store.UserAccount.profile.addresses)
    return address[0]
  }
  return 'NA'
})

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
  <sharedLoader v-if="loading" />
  <!-- main -->
  <div
    v-else
    class="flex bg-white p-3 rounded-xl w-full lg:w-[800px]  justify-evenly mb-6 gap-8"
  >
    <!-- avatar -->
    <div>
      <div class="avatar">
        <div class="w-24 rounded-full">
          <img
            :src="store.UserAccount
              .profile_pic"
          >
        </div>
        <a
          href="javascript:void(0);"
          onclick="my_modal_122.showModal()"
          class="absolute right-0"
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
              d="M12.2156 12.7975H1.74487C1.50637 12.7975 1.30859 12.5997 1.30859 12.3612C1.30859 12.1227 1.50637 11.925 1.74487 11.925H12.2156C12.4541 11.925 12.6519 12.1227 12.6519 12.3612C12.6519 12.5997 12.4541 12.7975 12.2156 12.7975Z"
              fill="#292D32"
            />
            <path
              opacity="0.4"
              d="M11.0642 2.02433C9.93564 0.895822 8.8304 0.866737 7.67281 2.02433L6.96894 2.7282C6.91077 2.78637 6.8875 2.87944 6.91077 2.96088C7.35287 4.5024 8.58608 5.73561 10.1276 6.17771C10.1509 6.18353 10.1741 6.18934 10.1974 6.18934C10.2614 6.18934 10.3196 6.16608 10.3661 6.11954L11.0642 5.41568C11.64 4.8456 11.9193 4.29298 11.9193 3.73455C11.9251 3.15866 11.6459 2.60022 11.0642 2.02433Z"
              fill="#292D32"
            />
            <path
              d="M9.08028 6.70706C8.91158 6.62563 8.7487 6.54419 8.59164 6.45111C8.46367 6.37549 8.34151 6.29405 8.21935 6.2068C8.12046 6.14281 8.00412 6.04974 7.8936 5.95666C7.88196 5.95085 7.84124 5.91595 7.79471 5.86941C7.60274 5.70653 7.38751 5.49712 7.19555 5.26443C7.1781 5.2528 7.14901 5.21208 7.10829 5.15973C7.05012 5.08992 6.95123 4.97358 6.86398 4.83979C6.79417 4.75253 6.71273 4.62456 6.63711 4.49658C6.54404 4.33952 6.4626 4.18246 6.38116 4.01958C6.29972 3.84507 6.23574 3.67638 6.17757 3.51932L2.52445 7.17243C2.44883 7.24805 2.37903 7.39348 2.36158 7.49237L2.04745 9.7203C1.98928 10.1159 2.09981 10.4882 2.34412 10.7383C2.55354 10.9419 2.84439 11.0524 3.15851 11.0524C3.22832 11.0524 3.29812 11.0466 3.36793 11.035L5.60168 10.7208C5.70638 10.7034 5.85181 10.6336 5.92161 10.558L9.57473 6.90484C9.41185 6.84667 9.25479 6.78269 9.08028 6.70706Z"
              fill="#292D32"
            />
          </svg>
        </a>
      </div>
    </div>
    <!-- Description -->
    <div class="flex-1">
      <div class="mb-6">
        <h3 class=" text-[#24242] font-semibold text-lg satoshiM flex items-center gap-2 mb-3">
          <span> {{ store.UserAccount
            .first_name }} {{ store.UserAccount
            .last_name }}</span>
        </h3>
        <div class="flex gap-2 items-center text-[#62646A] text-xs w-1/2 mb-1">
          <img
            :src="location"
            alt="Location icon"
            class="h-5"
          >
          <span class="font-medium text-[rgba(0,0,0,1)]">{{ userLocation.city }}, {{ userLocation.country }}</span>
          <a
            href="javascript:void(0);"
            onclick="my_modal_3.showModal()"
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
                d="M12.2156 12.7975H1.74487C1.50637 12.7975 1.30859 12.5997 1.30859 12.3612C1.30859 12.1227 1.50637 11.925 1.74487 11.925H12.2156C12.4541 11.925 12.6519 12.1227 12.6519 12.3612C12.6519 12.5997 12.4541 12.7975 12.2156 12.7975Z"
                fill="#292D32"
              />
              <path
                opacity="0.4"
                d="M11.0642 2.02433C9.93564 0.895822 8.8304 0.866737 7.67281 2.02433L6.96894 2.7282C6.91077 2.78637 6.8875 2.87944 6.91077 2.96088C7.35287 4.5024 8.58608 5.73561 10.1276 6.17771C10.1509 6.18353 10.1741 6.18934 10.1974 6.18934C10.2614 6.18934 10.3196 6.16608 10.3661 6.11954L11.0642 5.41568C11.64 4.8456 11.9193 4.29298 11.9193 3.73455C11.9251 3.15866 11.6459 2.60022 11.0642 2.02433Z"
                fill="#292D32"
              />
              <path
                d="M9.08028 6.70706C8.91158 6.62563 8.7487 6.54419 8.59164 6.45111C8.46367 6.37549 8.34151 6.29405 8.21935 6.2068C8.12046 6.14281 8.00412 6.04974 7.8936 5.95666C7.88196 5.95085 7.84124 5.91595 7.79471 5.86941C7.60274 5.70653 7.38751 5.49712 7.19555 5.26443C7.1781 5.2528 7.14901 5.21208 7.10829 5.15973C7.05012 5.08992 6.95123 4.97358 6.86398 4.83979C6.79417 4.75253 6.71273 4.62456 6.63711 4.49658C6.54404 4.33952 6.4626 4.18246 6.38116 4.01958C6.29972 3.84507 6.23574 3.67638 6.17757 3.51932L2.52445 7.17243C2.44883 7.24805 2.37903 7.39348 2.36158 7.49237L2.04745 9.7203C1.98928 10.1159 2.09981 10.4882 2.34412 10.7383C2.55354 10.9419 2.84439 11.0524 3.15851 11.0524C3.22832 11.0524 3.29812 11.0466 3.36793 11.035L5.60168 10.7208C5.70638 10.7034 5.85181 10.6336 5.92161 10.558L9.57473 6.90484C9.41185 6.84667 9.25479 6.78269 9.08028 6.70706Z"
                fill="#292D32"
              />
            </svg>
          </a>
        </div>
        <div class="flex items-center gap-2 mb-1">
          <div
            v-for="(rate, index) in store.UserAccount
              .rating"
            :key="index"
            class="rating w-4"
          >
            <input
              type="radio"
              name="rating-1"
              class="mask mask-star"
            >
          </div>
          <span class="text-xs font-bold">{{ store.UserAccount
            .rating }}</span>
          <span class="text-black text-xs">({{ store.UserAccount
            .ratings_count }} Ratings)</span>
        </div>
        <div
          v-if="store.UserAccount.account_type === 'worker'"
          class="flex gap-2 items-center text-[#62646A] text-xs w-1/2 mb-1"
        >
          <img
            :src="copysuccess"
            alt="Location icon"
            class="h-5"
          >
          <span class="font-medium text-[rgba(0,0,0,1)]">0 jobs Completed</span>
        </div>
      </div>
      <!-- Inbox response -->
      <div
        v-if="store.UserAccount.account_type === 'worker'"
        class="mb-6"
      >
        <div
          class="flex items-center text-[#404145] gap-8 text-sm mb-1"
        >
          <span class="font-medium">Inbox response time</span>
          <span class="font-bold satoshiM">{{ store.UserAccount
            .inbox_response_time }} Mins</span>
        </div>
        <div
          class="flex  items-center text-[#404145] gap-8 text-xs mb-1"
        >
          <span class="font-medium">Inbox response rate</span>
          <span class="font-bold satoshiM">{{ store.UserAccount
            .inbox_response_rate }}%</span>
        </div>
      </div>
      <div class="alert block mb-6">
        <h3 class="font-bold mb-2 flex items-center gap-2 justify-between">
          <span class="satoshiM">About Me </span>
          <a
            href="javascript:void(0);"
            onclick="my_modal_10.showModal()"
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
                d="M12.2156 12.7975H1.74487C1.50637 12.7975 1.30859 12.5997 1.30859 12.3612C1.30859 12.1227 1.50637 11.925 1.74487 11.925H12.2156C12.4541 11.925 12.6519 12.1227 12.6519 12.3612C12.6519 12.5997 12.4541 12.7975 12.2156 12.7975Z"
                fill="#292D32"
              />
              <path
                opacity="0.4"
                d="M11.0642 2.02433C9.93564 0.895822 8.8304 0.866737 7.67281 2.02433L6.96894 2.7282C6.91077 2.78637 6.8875 2.87944 6.91077 2.96088C7.35287 4.5024 8.58608 5.73561 10.1276 6.17771C10.1509 6.18353 10.1741 6.18934 10.1974 6.18934C10.2614 6.18934 10.3196 6.16608 10.3661 6.11954L11.0642 5.41568C11.64 4.8456 11.9193 4.29298 11.9193 3.73455C11.9251 3.15866 11.6459 2.60022 11.0642 2.02433Z"
                fill="#292D32"
              />
              <path
                d="M9.08028 6.70706C8.91158 6.62563 8.7487 6.54419 8.59164 6.45111C8.46367 6.37549 8.34151 6.29405 8.21935 6.2068C8.12046 6.14281 8.00412 6.04974 7.8936 5.95666C7.88196 5.95085 7.84124 5.91595 7.79471 5.86941C7.60274 5.70653 7.38751 5.49712 7.19555 5.26443C7.1781 5.2528 7.14901 5.21208 7.10829 5.15973C7.05012 5.08992 6.95123 4.97358 6.86398 4.83979C6.79417 4.75253 6.71273 4.62456 6.63711 4.49658C6.54404 4.33952 6.4626 4.18246 6.38116 4.01958C6.29972 3.84507 6.23574 3.67638 6.17757 3.51932L2.52445 7.17243C2.44883 7.24805 2.37903 7.39348 2.36158 7.49237L2.04745 9.7203C1.98928 10.1159 2.09981 10.4882 2.34412 10.7383C2.55354 10.9419 2.84439 11.0524 3.15851 11.0524C3.22832 11.0524 3.29812 11.0466 3.36793 11.035L5.60168 10.7208C5.70638 10.7034 5.85181 10.6336 5.92161 10.558L9.57473 6.90484C9.41185 6.84667 9.25479 6.78269 9.08028 6.70706Z"
                fill="#292D32"
              />
            </svg>
          </a>
        </h3>
        <p class="text-xs">
          {{ store.UserAccount
            ?.profile?.bio ?? 'Nil' }}
        </p>
      </div>
      <button
        v-show="store.UserAccount.account_type === 'employer'"
        class="btn mb-10 text-base font-bold text-[rgba(118, 127, 140, 1)] border-2 _border w-1/2"
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

        Become A Service Provider
      </button>
      <!-- For Employee view -->
      <div
        v-show="store.UserAccount.account_type === 'worker'"
        class=""
      >
        <div class="mb-5">
          <AuthRegistrationServiceCategory use-type="account" />
        </div>
        <AuthRegistrationWorkingHours use-type="account" />
      </div>
    </div>
  </div>

  <!-- Add Proifle -->
  <dialog
    id="my_modal_122"
    class="modal"
  >
    <div class="modal-box">
      <div class="card-body  flex justify-center gap-10">
        <h2
          class="card-title text-[rgba(35, 35, 35, 1)] font-bold text-3xl text-center"
        >
          Upload Profile Picture
        </h2>

        <!-- Avatar -->
        <div class="avatar mx-auto">
          <div class="w-24 rounded-full">
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
            href="javascript:void(0);"
            class="p-1 bg-gradient-to-r from-brightGold to-darkGold navigation-circle rounded-full absolute bottom-[-15px] left-8"
            @click="handleClick"
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

        <div class="card-actions justify-center">
          <BaseButton
            :loading="profile_loading"
            title="Done"
            color="rgba(33, 31, 31, 1)"
            text-color="rgba(255, 255, 255, 1)"
            border="#8B6914"
            :outline="false"
            class="block mb-5 w-[20%]"
            @click="upload"
          />
        </div>
      </div>

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
  <!-- update bio -->

  <dialog
    id="my_modal_10"
    class="modal"
  >
    <div class="modal-box">
      <h3 class="text-lg font-bold mb-4">
        Update Bio
      </h3>

      <label
        class=" text-base text-[#6E7191] mb-3"
        for=""
      >Description</label>
      <textarea
        v-model="userBio.bio"
        placeholder=""
        class="textarea textarea-bordered textarea-lg w-full "
      />
      <BaseButton
        title="Save"
        color="rgba(33, 31, 31, 1)"
        text-color="rgba(255, 255, 255, 1)"
        :outline="false"
        class="block w-full mb-5 mt-4"
        :loading="bioLoading"
        @click="updateBio"
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

  <!-- Add address -->
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
          v-model="userAddress.postal_code"
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
            v-model="userAddress.country"
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
          v-model="userAddress.state"
          label="State"
          type="text"
          placeholder=""
          class="mb-4 "
        />
        <BaseInput
          v-model="userAddress.city"
          label="City"
          type="text"
          placeholder=""
          class="mb-4 "
        />
        <BaseInput
          v-model="userAddress.street"
          label="Address"
          type="text"
          placeholder=""
          class="mb-4 "
        />
        <BaseInput
          v-model="userAddress.details"
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
          :loading="addressLoading"
          @click="handleAddAddress"
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
