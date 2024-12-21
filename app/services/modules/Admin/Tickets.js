// composables/api/modules/users.js
import { useBaseApi } from '../../baseApi'

export const TicketController = () => {
  const { get, post, put, del } = useBaseApi()

  // Users
  const createTicket = data => post(`tickets`, data)

  return {
    createTicket,
  }
}
