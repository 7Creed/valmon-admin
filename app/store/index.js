// FOR HOLDING GLOBAL AND TEMPORARY VARIABLE
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGlobalStore = defineStore('globalStore', {
  state: () => ({
    isProfileEnabled: ref(false),
    profileName: ref(''),
    isContactEnabled: ref(false),
  }),
  actions: {

  },
})
