// composables/api/modules/users.js
import { useBaseApi } from '../baseApi'

export const chatController = () => {
  const { get, post, put, del } = useBaseApi()

  // Users
  const getConversation = () => get(`chats/conversations`)
  const createConversation = data => post(`chats/conversations`, data)

  const getMessages = id => get(`chats/conversations/${id}/messages`)
  const sendMessages = (data, id) => post(`/chats/conversations/${id}/send`, data)

  // Negotiations
  const sendProposal = data => post(`chats/negotiations/proposal`, data)
  const acceptProposal = data => post(`chats/negotiations/accept-proposal`, data)
  const rejectProposal = data => post(`chats/negotiations/reject-proposal`, data)
  const initiatePayment = data => post(`chats/negotiations/payment`, data)
  // Mark as read
  const markAsRead = id => post(`chats/conversations/${id}/read`)

  return {
    getConversation,
    getMessages,
    createConversation,
    sendMessages,
    sendProposal,
    acceptProposal,
    rejectProposal,
    markAsRead,
    initiatePayment,
  }
}
