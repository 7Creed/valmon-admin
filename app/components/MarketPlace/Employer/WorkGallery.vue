<script setup>
import { useGlobalStore } from '@/store'

const images = import.meta.glob('@/assets/images/UIElements/img_*.jpg', { eager: true })
const ImageArray = Object.values(images).map(module => module.default)

const store = useGlobalStore()
</script>

<template>
  <div
    class="flex flex-wrap flex-row gap-10"
  >
    <div
      v-for="(image, index) in ImageArray"
      :key="index"
      class="card card-compact bg-base-100 w-[300px] h-[320px] shadow-xl p-4 relative"
    >
      <img
        :src="image"
        :alt="`Image ${index + 1}`"
        class=" h-[100%] "
      >
      <div
        v-show="store.isEmployee"
        class="absolute w-fit center p-2 bg-white rounded-full right-0 shadow-xl"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 18 18"
          fill="none"
        >
          <path
            d="M15.2678 4.38453C14.1701 4.27544 13.0724 4.19363 11.9678 4.13226V4.12544L11.8179 3.23908C11.7156 2.61181 11.5656 1.6709 9.97012 1.6709H8.18376C6.59512 1.6709 6.44512 2.5709 6.33603 3.23226L6.19285 4.10499C5.55876 4.1459 4.92467 4.18681 4.29058 4.24817L2.89967 4.38453C2.6133 4.41181 2.40876 4.66408 2.43603 4.94363C2.4633 5.22317 2.70876 5.42772 2.99512 5.40044L4.38603 5.26408C7.95876 4.90953 11.5588 5.0459 15.1724 5.40726C15.1929 5.40726 15.2065 5.40726 15.2269 5.40726C15.486 5.40726 15.711 5.20953 15.7383 4.94363C15.7588 4.66408 15.5542 4.41181 15.2678 4.38453Z"
            fill="#FA3535"
          />
          <path
            opacity="0.3991"
            d="M14.0132 6.36845C13.8495 6.19799 13.6245 6.10254 13.3927 6.10254H4.77455C4.54273 6.10254 4.31091 6.19799 4.15409 6.36845C3.99727 6.5389 3.90864 6.77072 3.92227 7.00936L4.345 14.0048C4.42 15.0412 4.51545 16.3366 6.895 16.3366H11.2723C13.6518 16.3366 13.7473 15.048 13.8223 14.0048L14.245 7.01618C14.2586 6.77072 14.17 6.5389 14.0132 6.36845Z"
            fill="#FA3535"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.43359 12.4088C7.43359 12.1264 7.66254 11.8975 7.94496 11.8975H10.2154C10.4978 11.8975 10.7268 12.1264 10.7268 12.4088C10.7268 12.6912 10.4978 12.9202 10.2154 12.9202H7.94496C7.66254 12.9202 7.43359 12.6912 7.43359 12.4088Z"
            fill="#FA3535"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M6.86768 9.68226C6.86768 9.39984 7.09662 9.1709 7.37904 9.1709H10.7881C11.0705 9.1709 11.2995 9.39984 11.2995 9.68226C11.2995 9.96468 11.0705 10.1936 10.7881 10.1936H7.37904C7.09662 10.1936 6.86768 9.96468 6.86768 9.68226Z"
            fill="#FA3535"
          />
        </svg>
      </div>
    </div>
  </div>
</template>
