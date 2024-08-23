<script setup>
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
  <!-- Reviews -->
  <section>
    <div class="card card-compact bg-base-100 shadow-xl px-6 py-4">
      <div class="card-body flex-col gap-5">
        <div class="flex items-center px-8 gap-8">
          <div class="flex flex-col gap-2 items-center">
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
          </div>
          <div class="rating_container ms-20 ">
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
        <!-- Review comment -->
        <div>
          <div
            v-for="(items, index) in 7"
            :key="index"
            role="alert"
            class="alert bg-white rounded-none items-start gap-3 mb-6 ms-10"
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
</template>
