// // store.js
import { useGlobalStore } from '../store/index'

export default defineNuxtPlugin((nuxtApp) => {
  // instantiate the useGlobalStore
  useGlobalStore()
})
