<script setup>
import slide_1 from '@/assets/images/UIElements/slide_1.jpg'
import slide_2 from '@/assets/images/UIElements/slide_2.jpg'

// rating
const ratings = [
  { id: 5, value: 100 },
  { id: 4, value: 80 },
  { id: 3, value: 60 },
  { id: 2, value: 40 },
  { id: 1, value: 20 },
]
</script>

<template>
  <div class="w-[90%]">
    <!-- Carousel Section -->
    <div class="card card-compact bg-base-100 shadow-xl px-4 mb-6">
      <div class="card-body">
        <!-- header -->
        <div class="text-xl font-semibold flex justify-between mb-4 satoshiM">
          <h3>Images</h3>
          <a class="link link-hover text-darkGold hover:decoration-darkGold">View All</a>
        </div>

        <!-- CAROUSEL -->
        <div class="relative">
          <!-- indicators  -->
          <div class="absolute bg-white w-fit center p-2 z-20 rounded-full top-[40%] left-[-20px] shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#00000"
              class="size-6"
            >
              <path
                fill-rule="evenodd"
                d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="absolute bg-white w-fit center p-2 z-20 rounded-full top-[40%] right-[-20px] shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#00000"
              class="size-6"
            >
              <path
                fill-rule="evenodd"
                d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="carousel rounded-box min-w-5/6 h-[500px] gap-4 relative">
            <div class="carousel-item w-1/2">
              <img
                :src="slide_1"
                class="w-full"
              >
            </div>
            <div class="carousel-item w-1/2">
              <img
                :src="slide_2"
                class="w-full"
              >
            </div>
            <div class="carousel-item w-1/2">
              <img
                src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
                class="w-full"
              >
            </div>
            <div class="carousel-item w-1/2">
              <img
                src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
                class="w-full"
              >
            </div>
            <div class="carousel-item w-1/2">
              <img
                src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp"
                class="w-full"
              >
            </div>
            <div class="carousel-item w-1/2">
              <img
                src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp"
                class="w-full"
              >
            </div>
            <div class="carousel-item w-1/2">
              <img
                src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
                class="w-full"
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Services -->
    <section>
      <div class="card card-compact bg-base-100 shadow-xl px-6 py-4 mb-6">
        <!-- header -->
        <div class="text-xl font-semibold flex justify-between mb-4 satoshiM">
          <h3>Services</h3>
          <a class="link link-hover text-darkGold hover:decoration-darkGold">View All</a>
        </div>

        <div class="card-body">
          <!-- row -->
          <div
            v-for="(items, index) in 3"
            :key="index"
            role="alert"
            class="alert bg-white border-2 text-base text-[rgba(0,0,0,1)] flex justify-between items-center mb-4"
          >
            <span class="font-bold">Tailoring</span>
            <span class="">
              <span>Title</span>
              <span class="font-bold ms-3">Male Suit Top</span>
            </span>

            <span>
              <span>Pricing Type</span>
              <span class="font-bold marker ms-3">Per Unit</span>
            </span>
            <span>
              <span>Price</span>
              <span class="font-bold ms-3">NGN 14000</span>
            </span>
            <a
              href="javascript:void(0)"
              class="font-black text-darkGold"
            >Hire</a>
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
          <a class="link link-hover text-darkGold hover:decoration-darkGold">View All</a>
        </div>

        <div class="card-body flex-row gap-5">
          <div class="center">
            <div class="flex flex-col gap-2 items-center border-r-4 w-[300px] pe-[40px]">
              <!-- rating -->
              <span class="text-black flex items-center gap-3">
                <span class="font-extrabold satoshiB text-7xl">4.7</span>
                <div class="rating">
                  <input
                    type="radio"
                    name="rating-2"
                    class="mask mask-star-2 bg-darkGold"
                  >
                </div>
              </span>
              <!-- reviews -->
              <button class="btn btn-neutral btn-sm rounded-full w-fit text-xs text-white mb-3">
                631 Reviews
              </button>
              <div class="rating_container ">
                <div
                  v-for="rating in ratings "
                  :key="rating.id"
                  class="center gap-2"
                >
                  <span>{{ rating.id }}</span>
                  <div class="rating rating-sm">
                    <input
                      type="radio"
                      name="rating-2"
                      class="mask mask-star-2 bg-orange-400"
                    >
                  </div>

                  <progress
                    class="progress w-56"
                    :value="rating.value"
                    max="100"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- Review comment -->
          <div>
            <div
              v-for="(items, index) in 2"
              :key="index"
              role="alert"
              class="alert bg-white rounded-none items-start gap-3 mb-6"
            >
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
                    <input
                      type="radio"
                      name="rating-1"
                      class="mask mask-star bg-darkGold"
                    >
                    <input
                      type="radio"
                      name="rating-1"
                      class="mask mask-star bg-darkGold"
                      checked="checked"
                    >
                    <input
                      type="radio"
                      name="rating-1"
                      class="mask mask-star  bg-darkGold"
                    >
                    <input
                      type="radio"
                      name="rating-1"
                      class="mask mask-star  bg-darkGold"
                    >
                    <input
                      type="radio"
                      name="rating-1"
                      class="mask mask-star  bg-darkGold"
                    >
                  </div>
                </div>
                <p>
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mol
                  Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint
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
