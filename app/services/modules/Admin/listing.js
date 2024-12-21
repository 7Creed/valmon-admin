// composables/api/modules/users.js
import { useAdminBaseApi } from '../../AdminBaseApi'

export const ListingsController = () => {
  const { get, post, put, del } = useAdminBaseApi()
  const getListingSummary = () => get('listings/summary')
  const getListingById = id => get(`listings/${id}`)
  const awaitingListing = () => get(`listings/awaiting`)
  const approveListing = id => put(`listings/${id}/approve`)
  const denyListing = id => put(`listings/${id}/deny`)
  const getCloseListing = () => get(`listings/closed`)
  const getMarketPlaceListing = () => get('listings/categories')
  const createMarketPlaceListing = data => post('marketplace/listing-category', data)
  const getConversation = id => get(`listings/conversations/${id}`)

  return {
    getListingSummary,
    getListingById,
    awaitingListing,
    approveListing,
    denyListing,
    getCloseListing,
    getMarketPlaceListing,
    createMarketPlaceListing,
    getConversation

  }
}
