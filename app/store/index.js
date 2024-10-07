// FOR HOLDING GLOBAL AND TEMPORARY VARIABLE
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGlobalStore = defineStore('globalStore', {
  state: () => ({
    // Managing UI based on user
    isEmployer: ref(false),
    isEmployee: ref(true),
    marketPlaceHeaderTab: ref(''),
    activeSideMenu: 'summary',
    viewParentSubCategory: ref(false),
    viewSkills: ref(false),
    viewProfileFromDashboard: ref(false),
    userEmail: 'tapahem842@jofuso.com',
    token: null,
  }),

  actions: {
    // Function to update the active tab on the marketplace lower header
    updateHeader: (value) => {
      this.state.marketPlaceHeaderTab = value
    },

  },

})
