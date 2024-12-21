// composables/api/modules/users.js
import { useBaseApi } from '../../baseApi'

export const MarketplaceController = () => {
  const { get, post, put, del } = useBaseApi()

  // Public listings view
  const getPublicMarketPlaceListing = () => get('get/featured-listings')
  return {
    getPublicMarketPlaceListing

  }
}
