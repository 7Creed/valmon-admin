import { defineStore } from 'pinia'
import { watch } from 'vue'
import { accountController } from '~/services/modules/account'

const { userAccount } = accountController()

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
    userOnline: ref(false),
    UserAccount: null,
    // Services information used under skills page
    usersByServices: ref(null),
    usersByServiceCP: 1,
    userIdForProfileCheck: null,
    // Hold selected Service
    selectedService: null,
    // Add Listings
    listingData: reactive({
      listing_category_id: '',
      location: '',
      title: '',
      color: '',
      price: '',
      negotiable: 1,
      condition: '',
      description: '',
      images: [],
    }),
    // fetch  market  Listings component after Upload.
    fetchListing: false,

    globalLoader: false,

    callUserAccount: false,
    profileSetupProcess: false,

    // For Creating new Conversation
    newConversationDetails: reactive({
      recipient_id: null,
      service_id: null,
    }),
  }),
  actions: {
    updateHeader(value) {
      this.marketPlaceHeaderTab = value
    },
    // function to save the state to the local storage
    saveState() {
      console.log('save_sate')
      localStorage.setItem('valmon', JSON.stringify(this.$state))
    },
    // Retrieves the state form localStorage and update the state
    loadState() {
      console.log('load_sate')
      const saved = localStorage.getItem('valmon')
      if (saved) {
        this.$patch(JSON.parse(saved))
      }
    },
    // Fetch user acc
    async getAccount() {
      // this.globalLoader = true
      try {
        const { status, data } = await userAccount()
        if (status.value === 'success') {
          this.UserAccount = data.value.data
          console.log(data.value.data)
        }

        if (status.value === 'error') {
          handleALert('error', 'Unable to fetch Account Information')
        }
      }
      catch (error) {
        handleError(error)
      }
      // finally {
      //   this.globalLoader = false
      // }
    },
    // update new conversation details
    updateNewConversationDetails(value) {
      this.newConversationDetails.recipient_id = value.recipient_id
      this.newConversationDetails.service_id = value.service_id
    },

    // Update the selected service from the Main Marketplace

    updateSelectedService(service) {
      this.selectedService = service
    }
  },
})

// Custom composable for persistence
export const useGlobalStore = () => {
  const store = useStore()

  // Load state when store is initialized
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
  return store
}
