<script setup>
import securitySafe from '../assets/icons/security-safe.svg'
import timer from '../assets/icons/timer.svg'
import walletAdd from '../assets/icons/wallet-add.svg'
import MosesTree from '../assets/images/UIElements/mosesTree.jpg'
import rectangle from '@/assets/images/UIElements/Rectangle.png'

import SellOnValmon from '~/components/MarketPlace/Market/SellOnValmon.vue'

import { categoryController } from '~/services/modules/category'
import { MarketplaceController } from '~/services/modules/Admin/marketplace'

const images = import.meta.glob('@/assets/images/UIElements/valmonskills*.png', { eager: true })
const ImageArray = Object.values(images).map(module => module.default)

const Features = [
  {
    image: walletAdd,
    title: 'Grow Your Client Base',
    text: 'We are committed to making the crypto experience as smooth as possible. We believe that by providing a safe and',
  },
  {
    image: securitySafe,
    title: 'Secure Payments',
    text: 'Receive payments securely through our trusted system. Our escrow feature ensures that your hard work is rewarded, with funds released only when you complete the project to the client’s satisfaction.',
  },
  {
    image: timer,
    title: '24/7 Support',
    text: 'Our support team is always here to help you succeed. Whether you need assistance with your profile, project issues, or payment queries, we offer round-the-clock support to ensure a smooth freelancing experience.',
  },
]

const Skills = ['Tutor', 'Shoe Expert', 'Tailor', 'Barber', 'Cleaner', 'Hair Dresser', 'Gardener mechanic']

const loading = ref(false)
const CategoryServices = ref([])
const { getPublicCategory_Services } = categoryController()
const fetchCategoryServices = async () => {
  loading.value = true
  try {
    const { status, data, error } = await getPublicCategory_Services()
    if (status.value === 'success') {
      CategoryServices.value = data.value.data
    }
    if (status.value === 'error') {
      handleError('error', error.value.data.message)
    }
  }
  catch (error) {
    handleError(error)
  }
  finally {
    loading.value = false
  }
}
fetchCategoryServices()

const { getPublicMarketPlaceListing } = MarketplaceController()
const listingLoader = ref(true)
const featuredListings = ref([])
const featuredListing = async () => {
  listingLoader.value = true
  const { status, data, error } = await getPublicMarketPlaceListing()
  if (status.value === 'success') {
    console.log(data.value.data)
    featuredListings.value = data.value.data
    listingLoader.value = false
  }
  if (status.value === 'error') {
    handleALert('error', error.value.data.message)
    listingLoader.value = false
  }
}

featuredListing()
</script>

<template>
  <div class="mb-20 lg:mb-30">
    <HomeHero />
    <div>
      <!-- Why Join Us -->
      <div class="text-center mb-4 md:mb-40 px-2 md:px-0">
        <h1 class="text-white font-bold staoshiM text-2xl lg:mb-10">
          Why Join Valmon
        </h1>
        <div class="flex flex-wrap ">
          <div
            v-for="(feature, index) in Features"
            :key="index"
            class="  text-white min-w-[300px] w-[400px] font-medium mx-auto py-10 "
          >
            <img
              :src="feature.image"
              alt=""
              class="mx-auto mb-3 md:mb-10"
            >
            <h2 class="text-xl mb-6">
              {{ feature.title }}
            </h2>
            <p class="text-white text-base">
              {{ feature.text }}
            </p>
          </div>
        </div>
      </div>
      <!-- Carousel -->

      <div class=" flex items-center justify-evenly w-full overflow-hidden skill-wrapper skill">
        <div
          v-for="(items, index) in Skills "
          :key="index"
          class="flex items-end w-fit px-4 py-2 gap-4 "
        >
          <svg
            width="31"
            height="31"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.1001 1.83742C13.4843 0.204464 15.7337 0.0171661 16.3827 1.56408L19.4316 8.83142C19.7218 9.52323 20.4245 9.94946 21.1722 9.88721L29.026 9.23323C30.6977 9.09402 31.571 11.1754 30.3003 12.2706L24.3308 17.4161C23.7626 17.9059 23.5743 18.7059 23.8646 19.3977L26.9135 26.6651C27.5625 28.212 25.8529 29.6856 24.4186 28.8156L17.6803 24.7283C17.0388 24.3393 16.2198 24.4075 15.6516 24.8973L9.68207 30.0427C8.41142 31.138 6.48157 29.9674 6.86578 28.3344L8.67077 20.6629C8.8426 19.9326 8.52464 19.1748 7.8832 18.7857L1.14492 14.6984C-0.289383 13.8284 0.227568 11.6313 1.89932 11.492L9.75315 10.8381C10.5008 10.7758 11.1233 10.2392 11.2951 9.50894L13.1001 1.83742Z"
              fill="url(#paint0_linear_1840_4388)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1840_4388"
                x1="-2.85987"
                y1="30.3099"
                x2="38.0205"
                y2="8.66535"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#EFE687" />
                <stop
                  offset="0.328152"
                  stop-color="#C09742"
                />
                <stop
                  offset="0.60818"
                  stop-color="#AC7729"
                />
                <stop
                  offset="0.741407"
                  stop-color="#CFB159"
                />
                <stop
                  offset="0.876021"
                  stop-color="#E2CE72"
                />
                <stop
                  offset="1"
                  stop-color="#AD7A22"
                />
              </linearGradient>
            </defs>
          </svg>
          <p class="text-white satoshiM font-bold text-2xl">
            {{ items }}
          </p>
        </div>
      </div>
      <!-- Platform category -->
      <div class="text-white mb-40 w-full px-4">
        <h4 class="text-2xl lg:text-3xl font-bold w-full md:w-2/4 mx-auto text-center mb-20 relative z-10 ">
          Discover our platform's wide range of freelance categories,
          where your unique skills find the perfect match
          with clients across diverse industries.
          <img
            :src="rectangle"
            alt="Rectangular"
            class="absolute rectangular"
          >
        </h4>
        <div class="mb-10 justify-center items-center lg:hidden flex">
          <img
            :src="MosesTree"
            alt=""
          >
        </div>
        <div
          class="h-auto rounded-lg lg:w-[80%] xl:w-[65%] flex text-base  p-4 justify-center mx-auto gap-5 font-bold  border border-darkGold "
        >
          <div class="techinical_services w-[400px] ">
            <h5 class="_header font-extrabold mb-4 p-3 text-center bg-darkGold">
              {{ CategoryServices.length ? CategoryServices[0].name : 'Technical Services' }}
            </h5>
            <div class="flex gap-4 justify-center items-center flex-wrap ">
              <span
                v-for="(items, index) in CategoryServices.length ? CategoryServices[0].services.slice(0, 15) : 21"
                :key="index"
                class="border border-darkGold py-2 px-4 rounded-lg text-sm lg:text-base"
              >{{ items.name ?? 'Placeholder' }}</span>
              <a
                href="Javascript:void(0)"
                class="border border-darkGold py-2 px-4 rounded-lg text-brightGold"
              >More</a>
            </div>
          </div>
          <div class="bg_img hidden lg:flex ">
            <img
              :src="MosesTree"
              alt=""
            >
          </div>
          <div class="softeare_skills  w-[400px]">
            <h5 class="_header font-extrabold p-3 mb-4 text-center bg-darkGold">
              {{ CategoryServices.length ? CategoryServices[1].name : 'Software Skills ' }}
            </h5>
            <div class="flex gap-4 items-center flex-wrap justify-center ">
              <span
                v-for="(items, index) in CategoryServices.length ? CategoryServices[1].services.slice(0, 15) : 21"
                :key="index"
                class="border border-darkGold py-2 px-4 rounded-lg text-sm lg:text-base"
              >{{ items.name ?? 'Placeholder' }}</span>
              <a
                href="Javascript:void(0)"
                class="border border-darkGold py-2 px-4 rounded-lg text-brightGold"
              >More</a>
            </div>
          </div>
        </div>
      </div>

      <!-- Other solutions -->
      <div class="text-white mb-40 px-4 lg:px-0">
        <h4 class="text-2xl lg:text-3xl font-bold md:w-2/4 mx-auto text-center mb-20 relative z-10">
          We hosts skilled professionals delivering innovative web designs, cutting-edge software solutions, and more
          with creativity and expertise.
          <img
            :src="rectangle"
            alt="Rectangular"
            class="absolute rectangular"
          >
        </h4>
        <div
        class="lg:w-[80%] xl:w-[65%]  flex flex-wrap text-base  p-4 justify-center mx-auto gap-5 font-bold  border border-darkGold rounded-lg"
        >
          <div
            v-for="(items, index) in ImageArray"
            :key="index"
            class="sm:w-[300px] h-[300px] flex "
          >
            <img
              :src="items"
              alt=""
              class="border border-darkGold rounded-lg "
            >
          </div>
        </div>
      </div>

      <!-- Featured Product -->
      <div class="text-white mb-40 px-4 lg:px-0">
        <h4 class="text-2xl lg:text-3xl font-bold md:w-2/4 mx-auto text-center mb-20 relative z-10">
          Our marketplace empowers customers to sell their items with ease, providing a trusted platform for
          high-quality transactions and exceptional service
          <img
            :src="rectangle"
            alt="Rectangular"
            class="absolute rectangular"
          >
        </h4>

        <h5 class="text-2xl font-bold w-[60%] mx-auto satoshiM mb-5">
          Featured Listings
        </h5>
        <div
        class="lg:w-[80%] xl:w-[65%] flex flex-wrap text-base  p-4 justify-center mx-auto gap-5 font-bold  border border-darkGold rounded-lg"
        >
          <HomeFeaturedListing
            :key="index"
            :listings="featuredListings.slice(0, 9)"
            class="max-h-[400px]"
          />
        </div>
      </div>

      <SellOnValmon class="hidden lg:block w-[60%] mx-auto mb-40" />

      <!-- Featured Product -->
      <div class="text-white mb-40 px-4 lg:px-0">
        <h4 class="text-2xl font-bold w-2/4 mx-auto text-center mb-20 relative z-10">
          Testimonials
        </h4>
        <div
          class="lg:w-[80%] xl:w-[65%]  flex flex-wrap text-base  p-4 justify-center mx-auto gap-5 font-bold  border border-darkGold rounded-lg"
        >
          <HomeTestimonies
            v-for="(item, index) in 5"
            :key="index"
            class="max-h-[400px]"
          />
        </div>
      </div>

      <!-- Join Our Community -->
      <div
        class="lg:w-[70%] mx-auto hero justify-items-start heroCommunity min-h-[500px] lg:min-h-[700px]  bg-cover  bg-no-repeat  border border-darkGold rounded-lg "
      >
        <div class="hero-overlay w-full  bg-black bg-opacity-50" />

        <div class="hero-content  text-white justify-start">
          <div class="max-w-full relative">
            <h2 class=" text-2xl lg:text-5xl font-extrabold mb-3">
              Join Our Community Today
            </h2>
            <p class="mb-4 text-lg font-medium ">
              Connect with clients and skilled professionals from around the world.
            </p>
            <button
              class="btn btn-outline bg-inherit text-white border-2 bg-gradient-to-r hover:from-[#C09742] hover:to-[#C09742] hover:border-[#CFB159]"
            >
              <span class="text-base font-medium">Sign Up Now</span>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.1887 1.82757C11.2083 1.37609 10.8582 0.994184 10.4067 0.974555L3.04947 0.654674C2.598 0.635045 2.21609 0.985127 2.19646 1.4366C2.17683 1.88808 2.52691 2.26999 2.97839 2.28962L9.51817 2.57396L9.23383 9.11374C9.21421 9.56522 9.56429 9.94713 10.0158 9.96676C10.4672 9.98638 10.8492 9.6363 10.8688 9.18483L11.1887 1.82757ZM1.10515 11.3959L10.9241 2.3952L9.81828 1.18885L-0.000662279 10.1896L1.10515 11.3959Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.rectangular {
  top: 0;
  right: 20rem;
  z-index: -1;
  width: 58px;
}

.heroCommunity {
  background-image: url('../assets//images/UIElements/Community.png');
}
</style>
