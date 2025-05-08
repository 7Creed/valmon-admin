<script setup>
import { useActiveView } from '@/composables/state'
import Loader from '~/components/shared/loader.vue'
import { useGlobalStore } from '~/store'

import { MiscController } from '~/services/modules/misc'

const { removeFromFavorites } = MiscController()

const store = useGlobalStore()
const { updateContactView, updateProfileView } = useActiveView()

const emit = defineEmits(['deleteListing'])
const props = defineProps({
  data: Array,
  loader: Boolean,
})

const openProfile = (id) => {
  store.$patch({
    userIdForProfileCheck: id || null,
  })
  updateProfileView()
}

const selectedServiceId = ref(null)

const selectedServices = (id) => {
  selectedServiceId.value = id
}

const selectedServiceIndex = ref(null)
const selectedUserId = ref(null)
const selectServices = (index) => {
  selectedServiceIndex.value = index
  selectedUserId.value = props.data[index].id
  console.log('Selected Service:', props.data[index].id)
  const modal = document.getElementById('my_modal_1')
  if (modal) {
    modal.showModal()
  }
}
const openChat = () => {
  store.updateNewConversationDetails(selectedUserId, selectedServiceId.value, null)
  store.newConversationDetails.gig = null
  navigateTo('/chat')
}

const deleteListingLoader = ref(false)
const favoriteItemActive = ref(null)

const deleteFavourites = async (id) => {
  favoriteItemActive.value = id
  deleteListingLoader.value = true

  const { status, error } = await removeFromFavorites('user', id)
  try {
    if (status.value === 'success') {
      handleALert('success', 'Listing removed from favourites')
      emit('deleteListing')
    }
    if (status.value === 'error') {
      handleALert('error', 'Error removing listing from favourites')
      console.error('Error fetching favourites:', error.value)
    }
  }
  catch (err) {
    handleALert('error', 'Error removing listing from favourites')
    console.error('Error fetching favourites:', err)
  }
  finally {
    deleteListingLoader.value = false
    favoriteItemActive.value = null
  }
}
</script>

<template>
  <div
    v-for="(item, index) in props.data"
    :key="item.id || index"
    class="card card-compact bg-base-100 w-80 shadow-xl"
  >
    <div class="card-body">
      <div
        class="absolute right-0 flex items-center gap-2 "
        @click.stop="deleteFavourites(item.id)"
      >
        <a
          class="archived p-2 bg-white rounded-full center shadow-md cursor-pointer"
        >
          <span
            v-if="deleteListingLoader && item.id == favoriteItemActive"
            class="loading loading-spinner loading-xs"
          />
          <svg
            v-else
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.8023 3.9225C14.5948 3.8025 13.3873 3.7125 12.1723 3.645V3.6375L12.0073 2.6625C11.8948 1.9725 11.7298 0.9375 9.97475 0.9375H8.00975C6.26225 0.9375 6.09725 1.9275 5.97725 2.655L5.81975 3.615C5.12225 3.66 4.42475 3.705 3.72725 3.7725L2.19725 3.9225C1.88225 3.9525 1.65725 4.23 1.68725 4.5375C1.71725 4.845 1.98725 5.07 2.30225 5.04L3.83225 4.89C7.76225 4.5 11.7223 4.65 15.6973 5.0475C15.7198 5.0475 15.7348 5.0475 15.7573 5.0475C16.0423 5.0475 16.2898 4.83 16.3198 4.5375C16.3423 4.23 16.1173 3.9525 15.8023 3.9225Z"
              fill="#FA3535"
            />
            <path
              opacity="0.3991"
              d="M14.4228 6.105C14.2428 5.9175 13.9953 5.8125 13.7403 5.8125H4.2603C4.0053 5.8125 3.7503 5.9175 3.5778 6.105C3.4053 6.2925 3.3078 6.5475 3.3228 6.81L3.7878 14.505C3.8703 15.645 3.9753 17.07 6.5928 17.07H11.4078C14.0253 17.07 14.1303 15.6525 14.2128 14.505L14.6778 6.8175C14.6928 6.5475 14.5953 6.2925 14.4228 6.105Z"
              fill="#FA3535"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.18457 12.75C7.18457 12.4393 7.43641 12.1875 7.74707 12.1875H10.2446C10.5552 12.1875 10.8071 12.4393 10.8071 12.75C10.8071 13.0607 10.5552 13.3125 10.2446 13.3125H7.74707C7.43641 13.3125 7.18457 13.0607 7.18457 12.75Z"
              fill="#FA3535"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.5625 9.75C6.5625 9.43934 6.81434 9.1875 7.125 9.1875H10.875C11.1857 9.1875 11.4375 9.43934 11.4375 9.75C11.4375 10.0607 11.1857 10.3125 10.875 10.3125H7.125C6.81434 10.3125 6.5625 10.0607 6.5625 9.75Z"
              fill="#FA3535"
            />
          </svg>
        </a>
      </div>
      <!-- Header -->
      <div class="flex items-center gap-6 mb-2">
        <!-- Avatar -->
        <div class="avatar">
          <div class="ring-brightGold ring-offset-base-100 w-16 rounded-full ring ring-offset-2">
            <img
              :src="item?.profile_pic"
              alt="User avatar"
              class="bg-gray-200"
            >
          </div>
        </div>

        <!-- Profile info -->
        <div>
          <h3 class="mb-1 text-[#24242] font-semibold text-sm satoshiM">
            {{ item?.first_name }} {{ item?.last_name }}
          </h3>

          <div class="text-xs py-1 px-2 bg-gray-200 tag rounded-sm mb-2">
            <span class="text-black">{{ item?.profile?.services[0].service.name || 'Not Available' }}</span>
          </div>

          <div class="flex items-center gap-2">
            <div class="rating w-4">
              <input
                type="radio"
                name="rating-1"
                class="mask mask-star"
                checked
              >
            </div>
            <span class="text-xs font-bold">{{ item.rating }}</span>
            <span class="text-black text-xs">({{ item.profile.ratings_count }} Ratings)</span>
          </div>
        </div>
      </div>

      <!-- Bio -->
      <div class="alert mb-2 h-20 bg-gray-50">
        <p>
          {{ item.profile?.bio }}
        </p>
      </div>

      <!-- Footer buttons -->
      <div class="card-actions justify-between gap-4">
        <button
          v-if="store.UserAccount?.account_type === 'employer'"
          class="btn btn-outline flex-1 rounded-2xl border-gray-300 border-2"
          @click="selectServices(index)"
        >
          Contact
        </button>
        <button
          class="btn btn-neutral flex-1 rounded-2xl border-2"
          @click="openProfile(item.id)"
        >
          Profile
        </button>
      </div>
    </div>
  </div>

  <!-- Empty state - will not show since we have mock data -->
  <div
    v-if="props.data?.length === 0"
    class="text-center py-8 text-gray-500"
  >
    <Loader v-if="props.loader" />
    <SharedAvailable
      v-else
      message="No Favourites Found"
    />
  </div>

  <!-- Open the modal using ID.showModal() method -->
  <!-- Add Category -->
  <dialog
    id="my_modal_1"
    class="modal"
  >
    <div class="modal-box">
      <h3 class="text-3xl font-bold text-[rgba(35, 35, 35, 1)] mb-4">
        Select Service Type
      </h3>
      <p class="mb-8 font-medium text-[rgba(36, 36, 36, 1)]">
        Select service type to contact this skilled worker for
      </p>
      <div
        v-for="(service, index) in data[selectedServiceIndex]?.profile?.services"
        :key="index"
        class="p-3 border rounded-md btn-block mb-5 bg-white border-gray-500"
      >
        <span class="flex flex-row justify-between w-full">

          <input
            type="radio"
            name="radio-1"
            class="radio"
            @change="selectedServices(service.service.id)"
          >
          <span class="text-[rgba(105, 102, 113, 1)] text-sm font-bold">{{ service.service.name }}</span>
          <span class="text-[rgba(105, 102, 113, 1)] text-sm font-medium">Year of experience {{
            service.years_of_experience }}</span>

        </span>
      </div>
      <BaseButton
        title="Continue"
        color="rgba(33, 31, 31, 1)"
        text-color="rgba(255, 255, 255, 1)"
        :outline="false"
        class="block w-full"
        @click="openChat()"
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
</template>

<style>
.tag {
  width: fit-content;
}
</style>
