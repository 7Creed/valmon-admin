// FOR HOLDING GLOBAL AND TEMPORARY VARIABLE
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGlobalStore = defineStore('globalStore', {
  state: () => ({
    // Managing UI based on user
    isEmployer: ref(false),
    isEmployee: ref(true),
  }),
  actions: {

  },
})
