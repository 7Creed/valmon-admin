// composables/api/modules/users.js
import { useBaseApi } from '../baseApi'

export const accountController = () => {
  const { get, post, put, del } = useBaseApi()

  const uploadProfilePicture = userData => post(`account/upload-photo`, userData)
  const addServiceCategory = userData => post(`account/services`, userData)
  const addWorkHours = userData => post(`account/working-hours`, userData)
  const addAddresses = userData => post(`account/addresses`, userData)
  // Account
  const userAccount = () => get('account')

  const SingleUserAccount = id => get(`/account/info/${id}`)

  // Gallery
  const getUserGallery = () => get('account/gallery')
  const addGallery = data => post('account/gallery', data)
  const deleteGallery = id => del(`account/gallery/${id}`)
  const singleGallery = id => get(`account/info/${id}/gallery`)
  // Services
  const getUserServices = () => get(`account/services`)
  // Market listings

  const addListing = (data, listing_category_id, location) => post(`account/marketplace?listing_category_id=${listing_category_id}?location=${location}`, data)
  const getListings = () => get('account/marketplace')
  const getListingCategories = () => get('account/marketplace/categories')
  const singleListingCategory = id => get(`account/info/${id}/marketplace`)

  return {
    uploadProfilePicture,
    addServiceCategory,
    addWorkHours,
    userAccount,
    getUserGallery,
    addGallery,
    deleteGallery,
    getUserServices,
    addListing,
    getListings,
    getListingCategories,
    addAddresses,
    SingleUserAccount,
    singleGallery,
    singleListingCategory,
  }
}
