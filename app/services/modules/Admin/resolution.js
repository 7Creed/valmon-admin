// composables/api/modules/users.js
import { useAdminBaseApi } from '../../AdminBaseApi'

export const ResolutionController = () => {
  const { get, post, put, del } = useAdminBaseApi()

  // Users
  const getServiceTicket = (page, search = '') => get(`tickets/services?perpage=10&page=${page}&search=${search}`)
  const getMarketPlaceTicket = (page, search = '') => get(`tickets/marketplace?perpage=10&page=${page}&search=${search}`)

  return {
    getServiceTicket,
    getMarketPlaceTicket,
  }
}
