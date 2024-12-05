<script setup>
import { ref, onMounted } from 'vue'
import archivedTick from '@/assets/icons/archive-tick.svg'
import { useGlobalStore } from '@/store'
import { MarketplaceController } from '~/services/modules/marketplace'

const store = useGlobalStore()
const { getListingCategories } = MarketplaceController()

// Update Tab
const activeTab = ref(null)
const MLCategory = ref([])

// Get Listing category with proper initialization
const fetchMLCategory = async () => {
  const { status, data, error } = await getListingCategories()
  if (status.value === 'success') {
    MLCategory.value = data.value.data
    // Set first category as active if none selected
    if (!store.activeHeaderTab && MLCategory.value.length > 0) {
      const firstCategory = MLCategory.value[0]
      activeTab.value = firstCategory.name
      store.$patch({
        activeHeaderTab: firstCategory.name,
        marketPlaceHeaderTab: firstCategory.name, // Also update this for consistency
      })
    }
    else {
      activeTab.value = store.activeHeaderTab
    }
    console.log('Categories loaded:', MLCategory.value)
  }
  if (status.value === 'error') {
    console.error('Error fetching categories:', error.value)
  }
}

async function changeTab(id, name) {
  activeTab.value = id
  await navigateTo({
    path: 'product',
    query: {
      name,
      id,
    },
  })
}

// Initialize on mount
onMounted(async () => {
  await fetchMLCategory()
  // Show popup if needed
  setTimeout(() => {
    if (popUp.value && store.isEmployee) {
      popUp.value.click()
    }
  }, 1000)
})

// Show New Job Offer Modal
const popUp = ref(null)
</script>

<template>
  <div class="bg-[#C09742] p-8 fixed w-full z-[1000]">
    <div class="text-black flex items-center justify-between container mx-auto">
      <a
        v-for="item in MLCategory"
        :key="item.id"
        href="javascript:void(0);"
        class="text-base w-fit p-2 rounded-lg"
        :class="{ activeClass: activeTab === item.name }"
        @click="changeTab(item.id, item.name)"
      >
        {{ item.name }}
      </a>
    </div>
  </div>
  <!-- Rest of your template... -->
</template>

<style scoped>
.activeClass {
  @apply text-valmon_Gold bg-black
}
</style>
