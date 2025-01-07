// composables/api/modules/users.js
import { useAdminBaseApi } from '../../AdminBaseApi'

export const ResolutionController = () => {
  const { get, post, put, del } = useAdminBaseApi()

  // Users
  const getServiceTicket = (page, search = '') => get(`tickets/services?perpage=10&page=${page}&search=${search}`)
  const getMarketPlaceTicket = (page, search = '') => get(`tickets/marketplace?perpage=10&page=${page}&search=${search}`)

  const getTicketsById = id => get(`tickets/${id}`)
  const refundSkills = id => post(`tickets/${id}/skills/refund-employer`)
  const refundMP = id => post(`tickets/${id}/marketplace/refund-buyer`)
  const paySkills = id => post(`tickets/${id}/skills/pay-worker`)
  const payMP = id => post(`tickets/${id}/marketplace/pay-seller`)



  return {
    getServiceTicket,
    getMarketPlaceTicket,
    getTicketsById,
    refundMP,
    refundSkills,
    payMP,
    paySkills
  }
}
