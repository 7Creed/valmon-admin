<script setup>
const props = defineProps({
  reviews: Object,
})

const getRatingPercentage = (reviewCount, totalReviews) => {
  const RP = (reviewCount / totalReviews) * 100
  return parseInt(RP)
}

const startIndex = ref(0)
const endIndex = ref(14)
const pagination = (value) => {
  console.log(value)
  startIndex.value = value.start
  endIndex.value = value.end
}
</script>

<template>
  <!-- Reviews -->
  <section>
    <div class="card card-compact bg-base-100 shadow-xl px-6 py-4">
      <SharedAvailable
        v-if="!props?.reviews?.data.length "
        message="Reviews"
      />
      <div
        v-else
        class="card-body flex-col md:flex-row flex-wrap  gap-5 "
      >
        <div class="flex flex-col md:flex-wrap justify-center sm:justify-start items-center lg:px-8 gap-8">
          <div class="flex flex-col gap-2 items-center">
            <!-- rating -->
            <span class="text-black flex items-center gap-3">
              <span class="font-extrabold satoshiB text-7xl">{{ props?.reviews?.average }}</span>
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
              {{ props.reviews.data.length }} Reviews
            </button>
          </div>
          <div class="rating_container lg:ms-20 ">
            <div
              v-for="(rating, index) in Object.values(props.reviews.ratings) "
              :key="index"
              class="center gap-2"
            >
              <span>{{ (index + 1) }}</span>
              <div class="rating rating-sm">
                <input
                  type="radio"
                  name="rating-2"
                  class="mask mask-star-2 bg-orange-400"
                >
              </div>

              <progress
                class="progress w-56"
                :value="getRatingPercentage(rating, props.reviews.data.length)"
                max="100"
              />
            </div>
          </div>
        </div>
        <!-- Review comment -->
        <div >
          <div
            v-for="(item, index) in props?.reviews?.data?.slice(startIndex, endIndex)"
            :key="index"
            role="alert"
            class=" alert bg-white rounded-none items-start gap-3 mb-6 lg:ms-10 flex-wrap w-full"
          >
            <!-- avatar -->
            <div class="avatar ">
              <div class="w-12 rounded-full">
                <img :src="item.reviewer.profile_pic">
              </div>
            </div>
            <!-- comment -->
            <div>
              <div class="flex text-[rgba(36,36,36,1)] items-center gap-2 mb-2">
                <h4 class="text-base font-bold satoshiB">
                  {{ item.reviewer.first_name }} {{ item.reviewer.last_name }}
                </h4>
                <div class="rating rating-sm">
                  <input
                    v-for="i in item.rating"
                    :key="i"
                    type="radio"
                    name="rating-1"
                    class="mask mask-star bg-darkGold"
                  >
                </div>
              </div>
              <p>
                {{ item.content }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <SharedPagination
      :item="props?.reviews?.data?.length"
      @slice-index="pagination"
    />
  </section>
</template>
