<script setup>
import MainProductView from '@/assets/images/UIElements/mainproductview.png'
import car from '@/assets/images/UIElements/car.png'
import car1 from '@/assets/images/UIElements/car1.png'
import car2 from '@/assets/images/UIElements/car2.png'

import { ListingsController } from '~/services/modules/Admin/listing'
// Import useState composable
import { useActiveView } from '@/composables/state'

import { useGlobalStore } from '~/store'

const store = useGlobalStore()

const emit = defineEmits('viewChat')

const ProductView = ref(MainProductView)

function updateProductImage(image) {
  ProductView.value = image
}

async function openChat(conversationId) {
  emit('viewChat', conversationId)
  store.$patch({
    viewAdminChatId: id,
  })
}

async function openContact(id) {
  store.$patch({
    adminUserId: id,
    profileChoice: 'listing',
  })
  navigateTo('/profile')
}

const { getListingById } = ListingsController()

const listing = ref({})
const loading = ref(false)
const getListing = async (id) => {
  loading.value = true
  const { data, error, status } = await getListingById(id)
  if (status.value === 'success') {
    listing.value = data.value.data
    loading.value = false
  }
  if (status.value === 'error') {
    handleError('error', error.value.data.message)
    loading.value = false
  }
}

getListing(store.adminListingId)
</script>

<template>
  <div class="w-full">
    <SharedLoader v-if="loading" />
    <div
      v-else
      class="h-[630px] flex gap-10 container mx-auto mb-8"
    >
      <!-- Left -->
      <div class="card flex-col justify-center items-start card-compact bg-base-100 w-[50%] shadow-xl p-4">
        <figure class="flex h-full w-full">
          <img
            :src="listing.images[0] "
            alt="Shoes"
            class="h-full w-full"
          >
        </figure>
        <div
          v-if="listing?.images.length > 1"
          class="card-body flex-row justify-center w-full"
        >
          <div
            v-for="(item, index) in listing?.images"
            :key="index"
            class="avatar"
            @click="updateProductImage(item)"
          >
            <div class="w-20 rounded-lg">
              <img :src="item">
            </div>
          </div>
        </div>
      </div>

      <!-- right -->
      <div class="card card-compact bg-base-100 w-[40%] shadow-xl text-[#242424]">
        <div class="card-body">
          <!-- header -->
          <div class="flex justify-between items-center mb-2">
            <h2 class="card-title">
              {{ listing.title }}
            </h2>
            <span class="center gap-2 bg-[#D0F18A] p-2 px-3 rounded-xl">
              <span>
                <!-- escrow -->
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="6.27275"
                    cy="6.2476"
                    r="4.12138"
                    fill="#687083"
                  />
                </svg>
                <!-- Active -->
                <svg
                  v-if="false"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="6.27284"
                    cy="6.2476"
                    r="4.12138"
                    fill="#E79E1F"
                  />
                </svg>
              </span>
              <span class="">{{ listing.status }}</span>
            </span>
          </div>
          <hr class="mb-5">
          <div class="flex items-center justify-between mb-2">
            <p>Price</p>
            <strong>NGN {{ listing.price }}</strong>
          </div>
          <div class="flex items-center justify-between mb-2">
            <p>Negotiable</p>
            <strong>{{ listing.negotiable == 1 ? 'Yes' : 'No' }}</strong>
          </div>
          <div class="flex items-center justify-between mb-2">
            <p>Condition</p>
            <strong>{{ listing.condition }}</strong>
          </div>

          <div class="flex items-center justify-between mb-2">
            <p>Color</p>
            <strong>{{ listing.color }}</strong>
          </div>

          <!-- Description -->
          <div class="bg-[#F4F4F4] p-2 mb-3">
            <h2 class="font-extrabold satoshiM">
              Description
            </h2>
            <p>
              {{ listing.description }}
            </p>
          </div>
          <!-- Profile Details -->
          <div class="flex items-center justify-between mb-3">
            <div class="flex  items-center gap-3 mb-2">
              <!-- avatar -->
              <div class="avatar">
                <div
                  class="ring-darkGold ring-offset-base-100 w-12 rounded-full ring ring-offset-2"
                >
                  <img
                    :src="listing.user?.profile_pic"
                  >
                </div>
              </div>
              <!-- Profile desc -->
              <div>
                <h3 class="mb-1 text-[#24242] font-semibold text-sm">
                  {{ listing.user?.first_name }} {{ listing.user?.last_name }}
                </h3>
                <div class="flex items-center gap-2">
                  <div class="rating w-4">
                    <input
                      type="radio"
                      name="rating-1"
                      class="mask mask-star"
                    >
                  </div>
                  <span class="text-xs font-bold">{{ listing.user?.ratings_count }}</span>
                  <span class="text-black text-xs">({{ listing.user?.rating }} Ratings)</span>
                </div>
              </div>
            </div>

            <button
              class="btn btn-outline  w-2/4"
              @click="openContact(listing.user_id)"
            >
              Profile
            </button>
          </div>
          <button
            v-if="listing.status != 'Escrow'"
            class="btn btn-neutral"
            @click="openChat(listing?.conversation_id)"
          >
            View Chat
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
