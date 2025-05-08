<script setup>
import { useGlobalStore } from '@/store'
import { MiscController } from '~/services/modules/misc'

const { removeFromFavorites } = MiscController()
const store = useGlobalStore()

const emit = defineEmits(['deleteListing'])
const props = defineProps({
  data: Array,
  loader: Boolean,
})
const openProduct = (id) => {
  navigateTo(`/product`)
  store.$patch({
    listingId: id,
  })
}

const deleteListingLoader = ref(false)
const favoriteItemActive = ref(null)

const deleteFavourites = async (id) => {
  favoriteItemActive.value = id
  deleteListingLoader.value = true

  const { status, error } = await removeFromFavorites('listing', id)
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
    v-for="item in props.data"
    :key="item.id"
    class="card card-compact bg-base-100 w-[280px] md:w-80 shadow-xl"
    @click="openProduct(item.id)"
  >
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

    <div class="card-body">
      <figure class="h-[260px] center">
        <img
          :src="item.images[0]"
          alt="ProductImage"
          class="object-cover w-full h-full"
        >
      </figure>
      <div class="flex items-center gap-6 mb-2">
        <div>
          <div class="text-xs py-1 px-2 bg-gray-200 tag rounded-sm mb-2">
            <span class="text-black">  {{ item.category.name }}</span>
          </div>
          <p class="mb-2 text-[#24242] font-semibold text-sm">
            {{ item.title }}
          </p>
          <div class="text-base md:text-lg text-[#242424] satoshiM">
            NGN {{ item.price.toLocaleString() }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.tag,
.archived {
  width: fit-content;
}
</style>
