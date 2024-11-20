// composables/api/modules/users.js
import { useBaseApi } from '../baseApi'

export const MiscController = () => {
  const { get, post, put, del } = useBaseApi()

  // Users
  const getCountries = () => get(`/get/countries`)

  return {
    getCountries
  }
}
