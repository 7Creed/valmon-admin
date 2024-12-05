// composables/api/modules/users.js
import { useBaseApi } from '../baseApi'

export const MiscController = () => {
  const { get, post, put, del } = useBaseApi()

  // Users
  const getCountries = () => get(`/get/countries`)

  const getBanks = () => get(`/get/banks`)
  const getCurrencies = () => get(`/get/currencies`)


  return {
    getCountries,
    getBanks,
    getCurrencies,
  }
}
