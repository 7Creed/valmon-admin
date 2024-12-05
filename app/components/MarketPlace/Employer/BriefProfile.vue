<script setup>
import { useGlobalStore } from '@/store'

const emits = defineEmits(['openTab'])
const store = useGlobalStore()
// rating
const ratings = [
  { id: 5, value: 100 },
  { id: 4, value: 80 },
  { id: 3, value: 60 },
  { id: 2, value: 40 },
  { id: 1, value: 20 },
]

const viewAll = (tab) => {
  emits('openTab', tab)
}

const props = defineProps({
  type: String, // type is profile if from User dashboard
  UserGallery: Array,
  gigs: Array,
})

const hire = (item) => {
  console.log(item)
  store.updateNewConversationDetails({
    recipient_id: store.userIdForProfileCheck,
    service_id: item.service.id,
  })
  store.updateGig(item.title, item.price)
  navigateTo('/chat')
}
</script>

<template>
  <div class="w-[90%]">
    <!-- Carousel Section -->
    <div class="card card-compact bg-base-100 shadow-xl px-4 mb-6">
      <div class="card-body">
        <!-- header -->
        <div class="text-xl font-semibold flex justify-between mb-4 satoshiM">
          <h3>Images</h3>
          <a v-if="props.UserGallery && props.UserGallery.length > 0"
            class="link link-hover text-darkGold hover:decoration-darkGold" @click="viewAll('gallery')">View All</a>
        </div>

        <SharedAvailable v-if="!props.UserGallery || props.UserGallery.length === 0" message="Gallery" />
        <!-- CAROUSEL -->
        <div v-else class="relative">
          <!-- indicators  -->
          <div class="absolute bg-white w-fit center p-2 z-20 rounded-full top-[40%] left-[-20px] shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#00000" class="size-6">
              <path fill-rule="evenodd"
                d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                clip-rule="evenodd" />
            </svg>
          </div>
          <div class="absolute bg-white w-fit center p-2 z-20 rounded-full top-[40%] right-[-20px] shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#00000" class="size-6">
              <path fill-rule="evenodd"
                d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                clip-rule="evenodd" />
            </svg>
          </div>
          <div class="carousel rounded-box min-w-5/6 h-[500px] gap-4 relative">
            <div v-for="(item, index) in props?.UserGallery" :key="index" class="carousel-item">
              <img :src="item.asset_url" class="w-full">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- GIGS -->
    <section>
      <div class="card card-compact bg-base-100 shadow-xl px-6 py-4 mb-6">
        <!-- header -->
        <div class="text-xl font-semibold flex justify-between mb-4 satoshiM">
          <h3>Gigs</h3>
          <a v-if="props.gigs && props.gigs.length > 0" class="link link-hover text-darkGold hover:decoration-darkGold"
            @click="viewAll('service')">View All</a>
        </div>
        <SharedAvailable v-if="!props.gigs || props.gigs.length === 0" message="Gigs" />
        <div v-else class="card-body">
          <!-- row -->
          <div v-for="(item, index) in props.gigs" :key="index"
            className=" rounded-lg overflow-hidden mb-3 border-gray-200 border">
            <div className="px-6 py-4 flex items-center gap-6">
              <div className="font-bold text-xl mb-2 w-1/6">
                {{ item.title }}
              </div>
              <div class="flex-1">
                <div className="px-6 pt-2 pb-2 bg-[#FFF3D5] rounded-xl mb-3">
                  <span className="inline-block text-sm font-semibold text-gray-700 mr-2 mb-2">
                    <span>Title</span> <span class="satoshiM inline-block ml-2"> {{ item.title }}</span>
                  </span>
                  <span className="inline-block text-sm font-semibold text-gray-700 mr-2 mb-2">
                    <span>Pricing Type</span> <span class="satoshiM inline-block ml-2">{{ item.pricing_type }}</span>
                  </span>
                  <span className="inline-block text-sm font-semibold text-gray-700 mr-2 mb-2">
                    <span>Price</span> <span class="satoshiM inline-block ml-2">NGN {{ item.price }}</span>
                  </span>
                </div>
                <p className="text-gray-700 text-base ">
                  {{ item.description }}
                </p>
              </div>
              <div class="">
                <a href="javascript:void(0)" class="text-darkGold text-base font-semibold block mb-5 satoshiM"
                  @click="hire(item)">Hire</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Reviews -->
    <section>
      <div class="card card-compact bg-base-100 shadow-xl px-6 py-4">
        <!-- header -->
        <div class="text-xl font-semibold flex justify-between mb-4 satoshiM">
          <h3>Reviews</h3>
          <a class="link link-hover text-darkGold hover:decoration-darkGold" @click="viewAll('review')">View All</a>
        </div>

        <div class="card-body flex-row gap-5">
          <div class="center">
            <div class="flex flex-col gap-2 items-center border-r-4 w-[300px] pe-[40px]">
              <!-- rating -->
              <span class="text-black flex items-center gap-3">
                <span class="font-extrabold satoshiB text-7xl">4.7</span>
                <div class="rating">
                  <input type="radio" name="rating-2" class="mask mask-star-2 bg-darkGold">
                </div>
              </span>
              <!-- reviews -->
              <button class="btn btn-neutral btn-sm rounded-full w-fit text-xs text-white mb-3">
                631 Reviews
              </button>
              <div class="rating_container ">
                <div v-for="rating in ratings " :key="rating.id" class="center gap-2">
                  <span>{{ rating.id }}</span>
                  <div class="rating rating-sm">
                    <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400">
                  </div>

                  <progress class="progress w-56" :value="rating.value" max="100" />
                </div>
              </div>
            </div>
          </div>
          <!-- Review comment -->
          <div>
            <div v-for="(items, index) in 2" :key="index" role="alert"
              class="alert bg-white rounded-none items-start gap-3 mb-6">
              <!-- avatar -->
              <div class="avatar ">
                <div class="w-12 rounded-full">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp">
                </div>
              </div>
              <!-- comment -->
              <div>
                <div class="flex text-[rgba(36,36,36,1)] items-center gap-2 mb-2">
                  <h4 class="text-base font-bold satoshiB">
                    Mira Thira
                  </h4>
                  <div class="rating rating-sm">
                    <input type="radio" name="rating-1" class="mask mask-star bg-darkGold">
                    <input type="radio" name="rating-1" class="mask mask-star bg-darkGold" checked="checked">
                    <input type="radio" name="rating-1" class="mask mask-star  bg-darkGold">
                    <input type="radio" name="rating-1" class="mask mask-star  bg-darkGold">
                    <input type="radio" name="rating-1" class="mask mask-star  bg-darkGold">
                  </div>
                </div>
                <p>
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis
                  enim velit mol
                  Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua
                  dolor do amet sint
                  . Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
