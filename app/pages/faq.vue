<script setup>
import rectangle from '@/assets/images/UIElements/Rectangle.png'

const accordion = ref(null)

const openAcc = (accIndex) => {
  accordion.value = accIndex
}
</script>

<template>
  <div class="  bg-stone-950 min-h-[800px]  relative mb-20 lg:mb-30">
    <div class="hero  min-h-auto">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <h1 class="text-3xl lg:text-5xl font-bold text-white text-center pt-20 mb-12 relative w-fit mx-auto z-10 satoshiM">
            Valmon FAQs
            <img
              :src="rectangle"
              alt="rectangular-background"
              class="w-16 top-[5rem] right-[3rem] absolute -z-10"
            >
          </h1>
          <h6 class="py-6 text-2xl text-white">
            All concerns should be emailed to <span class="text-brightGold">support@valmonvalues.com</span> and we will get back to you
          </h6>
          <a
            href="mailto:support@valmonvalues.com"
            class="btn btn-outline border-white text-white"
          >
            Email Us
          </a>
        </div>
      </div>
    </div>
    <div class=" mx-auto mt-8 p-10 rounded-lg flex flex-wrap gap-4 container">
      <!-- Card left -->
      <div class="card card-compact bg-base-100  w-full lg:w-72 mb-20 lg:mb-5 shadow-xl bg-inherit border border-darkGold h-fit ">
        <div class="card-body">
          <h2 class="card-title text-white mb-5">
            Topic Navigation
          </h2>
          <div
            v-for="(item, index) in 5"
            :key="index"
            role="alert"
            class="alert border border-darkGold hover:bg-darkGold bg-inherit text-white hover:text-white flex justify-center"
          >
            <span class="text-base font-semibold">Topic Placeholder</span>
          </div>
        </div>
      </div>
      <!-- Accordion -->
      <div class="accordion_wrapper w-full lg:w-3/5 ms-8">
        <div
          v-for="(item, index) in 8 "
          :key="index"
          class=" border border-darkGold p-4 px-6 rounded-2xl mb-6 w-full"
          @click="openAcc(index)"
        >
          <!-- Header -->
          <div class="flex justify-between items-center mb-2">
            <h2 class="text-white text-lg font-bold">
              What is Valmon?
            </h2>
            <!-- Icons -->
            <span>
              <!-- chevron  right -->
              <a
                v-if="accordion !== index"
                href="javascript:void(0)"
                @click="openAcc(index)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#CFB159"
                  class="size-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                    clip-rule="evenodd"
                  />
                </svg>

              </a>
              <!-- Chevron down -->
              <a
                v-if="accordion === index"
                href="javascript:void(0);"
              >
                <svg

                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#CFB159"
                  class="size-6"
                >
                  <path
                    fill-rule="evenodd"
                    d="M12.53 16.28a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 0 1 1.06-1.06L12 14.69l6.97-6.97a.75.75 0 1 1 1.06 1.06l-7.5 7.5Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </a>

            </span>
          </div>
          <!-- Body -->
          <p
            v-if="accordion === index"
            class="text-white w-[95%]"
          >
            Lorem ipsum dolor sit amet consectetur. Tincidunt sapien risus ut e
            st augue tortor tellus. Cursus elementum iaculis sagittis commodo et nec augue. Nisl euismod eu
            tincidunt amet id. Semper lorem sit nisl nec nec. Feugiat nulla dui at viverra eu non sit lectus.
            Sed platea lectus nisl sed etiam tellus euismod.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
p, h3, li{
  color: white !important;
}
p, li {
  font-weight: 500;
  font-size: 18px;
}

h3 {
  font-weight: 700;
  font-size: 20px;
}
.card-title {
  margin-bottom: 15px;
}
</style>
