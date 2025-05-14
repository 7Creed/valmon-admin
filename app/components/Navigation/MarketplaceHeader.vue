<script setup>
import { ref, onMounted } from 'vue'
import archivedTick from '@/assets/icons/archive-tick.svg'
import { useGlobalStore } from '@/store'
import { MarketplaceController } from '~/services/modules/marketplace'

const store = useGlobalStore()
const { getListingCategories, getPublicListingCategories } = MarketplaceController()

// Update Tab
const activeTab = ref(null)

const MLCategory = ref([])

const routeId = useRoute().query.id
// Get Listing category with proper initialization
const fetchMLCategory = async () => {
  const { status, data, error } = await getPublicListingCategories()
  if (status.value === 'success') {
    MLCategory.value = data.value.data
    activeTab.value = store.activeHeaderTab
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
    if (popUp.value && store.UserAccount.account_type == 'worker') {
      popUp.value.click()
    }
  }, 1000)
})

// Show New Job Offer Modal
const popUp = ref(null)
</script>

<template>
  <div class="p-2 flex justify-center fixed w-full h-[50px] z-[1000] top-[60px] gradient-background">
    <div class="hidden w-auto text-black lg:flex items-center container">
      <a
        v-for="item in MLCategory"
        :key="item.id"
        href="javascript:void(0);"
        class="text-[12px] font-[400] w-fit p-2 mx-3 rounded-lg font-app-primary"
        :class="{ activeClass: activeTab == item.id || (routeId == item.id) }"
        @click="changeTab(item.id, item.name)"
      >
        {{ item.name }}
      </a>
    </div>
    <!-- Mobile View -->
    <div class="flex items-center justify-center gap-4 lg:hidden">
      <p class="text-[12px] font-[400] text-[#242424] satoshiB">
        Browse Our Product Categories
      </p>
      <div class="dropdown dropdown-end  flex">
        <div
          tabindex="0"
          role="button"
          class="btn btn-circle btn-ghost btn-xs text-info"
        >
          <svg
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.5 0C5.152 0 0 5.152 0 11.5C0 17.848 5.152 23 11.5 23C17.848 23 23 17.848 23 11.5C23 5.152 17.848 0 11.5 0ZM11.5 14.95L6.9 10.35H16.1L11.5 14.95Z"
              fill="#242424"
            />
          </svg>
        </div>
        <div
          tabindex="0"
          class="card compact dropdown-content bg-base-100 rounded-box z-[1] w-72 shadow"
        >
          <div
            tabindex="0"
            class="card-body flex-row gap-2"
          >
            <a
              v-for="item in MLCategory"
              :key="item.id"
              href="javascript:void(0);"
              class="text-base w-fit p-2 rounded-lg hover:bg-gray-200"
              :class="{ activeClass: activeTab === item.name }"
              @click="changeTab(item.id, item.name)"
            >
              {{ item.name }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Rest of your template... -->
</template>

<style scoped>
.activeClass {
  @apply text-valmon_Gold bg-black
}
</style>
