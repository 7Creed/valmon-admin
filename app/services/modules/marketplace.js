// composables/api/modules/users.js
import { useBaseApi } from '../baseApi'

export const MarketplaceController = () => {
  const { get, post, put, del } = useBaseApi()

  // 
  const getListingById = id => get(`marketplace/listings/${id}`)
  const getFeaturedListings = () => get(`marketplace/featured-listings`)
  const getListingCategories = () => get(`marketplace/categories`)
  const getAppListing = (params) => {
    let url = 'marketplace/listings?';
    let paramList = [];
    Object.keys(params).forEach((key) => {
      params[key] && paramList.push(`${key}=${params[key]}`)
    })
    // if (category) url += `category=${category}&`
    // if (location) url += `location=${location}&`
    // if (minPrice) url += `minPrice=${minPrice}&`
    // if (maxPrice) url += `maxPrice=${maxPrice}&`
    // if (color) url += `color=${color}&`
    // if (condition) url += `condition=${condition}`
    return get(url + paramList.join('&'))
  }

  return {
    getListingById,
    getFeaturedListings,
    getListingCategories,
    getAppListing
  }
}
