<script setup>
import archivedTick from '@/assets/icons/archive-tick.svg'
import { accountController } from '~/services/modules/account'
import { MarketplaceController } from '~/services/modules/marketplace'
import { useGlobalStore } from '@/store'

const store = useGlobalStore()

const props = defineProps({
  listings: Boolean,
  type: String,
  otherListings: Array, // similar Listings | selected Listings from main marketplace and product page
})
const { getListings, singleListingCategory } = accountController()

// For Profile
const marketListings = ref([])
const loader = ref(false)
const fetchListing = async () => {
  loader.value = true
  const { status, data, error } = await getListings()
  if (status.value === 'success') {
    // console.log(data.value.data)
    marketListings.value = data.value.data
    loader.value = false
  }
  if (status.value === 'error') {
    handleALert('error', error.value.data.message)
    loader.value = false
  }
}

const fetchSingleListing = async (id) => {
  loader.value = true
  const { status, data, error } = await singleListingCategory(id)
  if (status.value === 'success') {
    // console.log(data.value.data)
    marketListings.value = data.value.data
    loader.value = false
  }
  if (status.value === 'error') {
    handleALert('error', error.value.data.message)
    loader.value = false
  }
}

const callListing = async () => {
  switch (props?.type) {
    case 'profile':
      fetchSingleListing(store.userIdForProfileCheck)
      break
    case 'featuredListings':
      marketListings.value = props.otherListings
      break
    default:
      fetchListing()
      break
  }
}
callListing()
watch(props, (newVal) => {
  if (newVal) callListing()
}, {
  deep: true,
})

// manage  product function

const productCardFunction = (id) => {
  // for opening chat for listing
  if (store.marketPlaceTab) {
    openChatForListing(id)
  }
  else {
    openProduct(id)
  }
}
const openChatForListing = (listingId) => {
  store.updateNewConversationDetails(store.userIdForProfileCheck, null, listingId)
  navigateTo('/chat')
}
const openProduct = (id) => {
  navigateTo(`/product`)
  store.$patch({
    listingId: id,
  })
}
</script>

<template>
  <template v-if="loader">
    <SharedLoader v-if="loader" />
  </template>

  <template v-else>
    <SharedAvailable
      v-if="!marketListings || marketListings.length === 0"
      message="Listing"
    />
    <div
      v-for="(item, index) in marketListings"
      :key="item.id"
      class="card card-compact bg-base-100 w-80 shadow-xl"
      @click="productCardFunction(item.id)"
    >
      <div class="absolute right-0 flex items-center gap-2">
        <a
          v-if="props.listings"
          href="javascript:void(0);"
          class="archived p-2 bg-white rounded-full center shadow-md"
        >
          <svg
            width="20"
            height="20"
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
        <a
          v-if="props.listings"
          href="javascript:void(0);"
          class="archived p-2 bg-white rounded-full center shadow-md"
        >
          <svg
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
        <a
          v-else
          href="javascript:void(0);"
          class="archived p-2 bg-black rounded-full center "
        >
          <img
            :src="archivedTick"
            alt="favorite icon"
            class="w-5"
          >

        </a>
      </div>

      <div class="card-body">
        <figure>
          <img
            :src="item.images[0]"
            alt="Shoes"
          >
        </figure>
        <div class="flex items-center gap-6 mb-2">
          <!-- Profile desc -->
          <div>
            <div class="text-xs py-1 px-2 bg-gray-200 tag rounded-sm mb-2">
              <span class="text-black">{{ item.title }}</span>
            </div>
            <p class="mb-2 text-[#24242] font-semibold text-sm">
              {{ item.category.name }}
            </p>

            <div class="text-lg text-[#242424] satoshiM">
              NGN {{ item.price }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<style>
.tag,
.archived {
  width: fit-content;
}
</style>
