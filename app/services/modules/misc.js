// composables/api/modules/users.js
import { useBaseApi } from '../baseApi'

export const MiscController = () => {
  const { get, post, put, del } = useBaseApi()

  // Users
  const getCountries = () => get(`/get/countries`)

  const getBanks = () => get(`/get/banks`)
  const getCurrencies = () => get(`/get/currencies`)

  // Favorites
  const getFavorites = type => get(`/favourites?type=${type}`)
  const addToFavorites = data => post(`/favourites`, data)
  const removeFromFavorites = (type, id) => del(`/favourites?type=${type}&id=${id}`)
  return {
    getCountries,
    getBanks,
    getCurrencies,
    getFavorites,
    addToFavorites,
    removeFromFavorites,
  }
}
