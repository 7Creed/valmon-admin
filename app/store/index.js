import { defineStore } from 'pinia'
import { watch } from 'vue'

export const useStore = defineStore('valmon_app_store', {
  state: () => ({
    isEmployer: false,
    isEmployee: true,
    marketPlaceHeaderTab: '',
    activeSideMenu: 'summary',
    viewParentSubCategory: false,
    viewSkills: false,
    viewProfileFromDashboard: false,
    serviceCategory: [],
  }),
  actions: {
    updateHeader(value) {
      this.marketPlaceHeaderTab = value
    },
    // function to save the state to the local storage
    saveState() {
      console.log('save_sate')
      localStorage.setItem('valmonStore', JSON.stringify(this.$state))
    },
    // Retrieves the state form localStorage and update the state
    loadState() {
      console.log('load_sate')
      const saved = localStorage.getItem('valmonStore')
      if (saved) {
        this.$patch(JSON.parse(saved))
      }
    },
  },
})

// Custom composable for persistence
export const useGlobalStore = () => {
  const store = useStore()

  // Load state when store is initialized
  if (import.meta.client) {
    store.loadState()

    // Watch for changes in the store and save to localStorage
    watch(
      () => store.$state,
      () => {
        store.saveState()
      },
      { deep: true },
    )
    // Save state on page unload
    window.addEventListener('beforeunload', () => {
      store.saveState()
    })
  }

  return store
}
