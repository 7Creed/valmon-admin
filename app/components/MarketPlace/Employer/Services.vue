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
const EditService = (index) => {
  emit('editService', index)
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
          v-for="(item, index) in displayGigs"
          :key="index"
          class="card card-compact bg-base-100 shadow-md px-6 py-4 mb-6"
        >
          <!-- row -->
          <div className="bg-white rounded-lg overflow-hidden">
            <div className="px-6 py-4 flex items-center gap-6">
              <div className="font-bold text-xl mb-2">
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
              <div v-show="!props.type === 'profile'" class="">
                <a
                  href="javascript:void(0)"
                  class="text-darkGold text-sm font-semibold block mb-5"
                  @click="EditService(index)"
                >Edit</a>
                <a
                  href="javascript:void(0)"
                  class="text-red-600 text-sm font-semibold block"
                  @click="deleteService(index)"
                >Delete</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
