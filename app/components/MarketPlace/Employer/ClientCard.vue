<script setup>
import { useActiveView } from '@/composables/state'
import { useGlobalStore } from '~/store'

const store = useGlobalStore()

const props = defineProps({
  serviceByUsers: Array,
  skill: String,
})
// use the useActiveView composables
const { updateContactView } = useActiveView()

const openProfile = (id) => {
  store.$patch({
    userIdForProfileCheck: id,
  })
}
const openContact = (userId, serviceId) => {
  store.updateNewConversationDetails(userId, serviceId)
  updateContactView()
}
</script>

<template>
  <div
    v-for="(item, index) in props?.serviceByUsers"
    :key="item.user.id"
    class="card card-compact bg-base-100 w-80 shadow-xl"
  >
    <div class="card-body">
      <!-- Header -->
      <div class="flex items-center gap-6 mb-2">
        <!-- avatar -->
        <div class="avatar">
          <div class="ring-brightGold ring-offset-base-100 w-16 rounded-full ring ring-offset-2">
            <img :src="item.user.profile_pic">
          </div>
        </div>
        <!-- Profile desc -->
        <div>
          <h3 class="mb-1 text-[#24242] font-semibold text-sm satoshiM">
            {{ item.user.first_name }}   {{ item.user.last_name }}
          </h3>
          <div class="text-xs py-1 px-2 bg-gray-200 tag rounded-sm mb-2">
            <span class="text-black">{{ props?.skill }}</span>
          </div>
          <div class="flex items-center gap-2">
            <div

              class="rating w-4"
            >
              <input
                type="radio"
                name="rating-1"
                class="mask mask-star"
              >
            </div>
            <span class="text-xs font-bold">{{ item.user.rating }}</span>
            <span class="text-black text-xs">({{ item.user.ratings_count }} Ratings)</span>
          </div>
        </div>
      </div>
      <!-- body -->

      <div class="alert mb-2 h-20">
        <p>
          {{ item.bio ? (item.bio).slice(0, 100) : 'Nil' }}
        </p>
      </div>

      <!-- Footer -->
      <div class="card-actions justify-between gap-4">
        <button
          class="btn btn-outline flex-1 rounded-2xl border-gray-300 border-2"
          @click="openContact(item.user.id, item.selected_service_id)"
        >
          Contact
        </button>
        <button
          class="btn btn-neutral flex-1 rounded-2xl border-2"
          @click="openProfile(item.user.id)"
        >
          Profile
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.tag {
  width: fit-content;
}
</style>
