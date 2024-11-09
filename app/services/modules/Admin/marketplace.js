// composables/api/modules/users.js
import { useBaseApi } from '../../baseApi'

export const MarketplaceController = () => {
  const { get, post, put, del } = useBaseApi()

  // Gallery
  const getMarketPlaceListing = () => get('admin/marketplace/listing-category')
  const createMarketPlaceListing = data => post('admin/marketplace/listing-category', data)

  // Public listings view
  const getPublicMarketPlaceListing = () => get('get/featured-listings')
  return {
    getMarketPlaceListing,
    createMarketPlaceListing,
    getPublicMarketPlaceListing

  }
}
