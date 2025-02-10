<script setup>
import { useGlobalStore } from '@/store'

const store = useGlobalStore()
const emit = defineEmits(['deleteService', 'editService'])

const props = defineProps({
  gigs: Array,
  type: String, // type is profile if from User dashboard

})
const deleteService = (index) => {
  emit('deleteService', index)
}
const EditService = (index, item) => {
  emit('editService', { index: index, item: item })
}

// Display Gigs based on type
const displayGigs = computed(() => {
  if (props.type === 'profile') {
    return props.gigs
  }
  else {
    return store?.UserAccount?.profile?.gigs
  }
})
const hire = (item) => {
  console.log(item)
  store.updateNewConversationDetails(store.userIdForProfileCheck, item.service.id)
  store.updateGig(item.title, item.price)
  navigateTo('/chat')
}

const isAdmin = computed(() => {
  return store?.UserAccount?.role == 'admin' || store?.UserAccount?.role == 'super_admin'
})

const startIndex = ref(0)
const endIndex = ref(14)
const pagination = (value) => {
  console.log(value)
  startIndex.value = value.start
  endIndex.value = value.end
}
</script>

<template>
  <!-- Services -->
  <section>
    <div>
      <SharedAvailable
        v-if="!displayGigs ||displayGigs.length === 0"
        message="Gigs"
      />
      <div v-else>
        <div
          v-for="(item, index) in displayGigs.slice(startIndex, endIndex)"
          :key="index"
          class="card card-compact bg-base-100 shadow-md px-2 md:px-6 py-4 mb-6"
        >
          <!-- row -->
          <div class="bg-white rounded-lg overflow-hidden">
            <div class="px-4 md:px-6 py-4 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
              <div class="font-bold text-xl mb-2 md:mb-0 w-full md:w-1/6">
                {{ item.title }}
              </div>
              <div class=" w-full lg:flex-1">
                <div class="flex justify-between px-4 md:px-6 pt-2 pb-2 bg-[#FFF3D5] rounded-xl mb-3">
                  <span class="block text-base  text-gray-700 mb-2">
                    <span>Title:</span> <span class="satoshiM ml-2 font-semibold"> {{ item.title }}</span>
                  </span>
                  <span class="block text-base  text-gray-700 mb-2">
                    <span>Pricing Type:</span> <span class="satoshiM ml-2 font-semibold">{{ item.pricing_type }}</span>
                  </span>
                  <span class="block text-base  text-gray-700 mb-2">
                    <span>Price:</span> <span class="satoshiM ml-2 font-semibold">NGN {{ item.price }}</span>
                  </span>
                </div>
                <p class="text-gray-700 text-base">
                  {{ item.description }}
                </p>
              </div>
              <div class="flex flex-col md:flex-row gap-2 md:gap-4">
                <div v-if="props.type != 'profile'">
                  <a
                    href="javascript:void(0)"
                    class="mb-3 text-darkGold text-sm md:text-base font-semibold block"
                    @click="EditService(index, item)"
                  >Edit</a>
                  <a
                    href="javascript:void(0)"
                    class="text-red-600 text-sm md:text-base font-semibold block"
                    @click="deleteService(index)"
                  >Delete</a>
                </div>

                <div
                  v-if="props.type === 'profile' && !isAdmin"
                  class=""
                >
                  <a
                    href="javascript:void(0)"
                    class="text-darkGold text-base font-semibold block mb-2 md:mb-0 satoshiM"
                    @click="hire(item)"
                  >Hire</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SharedPagination
        :item="displayGigs?.length"
        @slice-index="pagination"
      />
    </div>
  </section>
</template>
