// composables/api/modules/users.js
import { useBaseApi } from '../baseApi'

export const servicesController = () => {
  const { get, post, put, del } = useBaseApi()

  // Users
  const getConversation = () => get(`chats/conversations`)
  const sendConversation = data => post(`chats/conversations`, data)

  const getMessages = id => get(`chats/conversations/${id}/messages`)
  const sendMessages = (data, id) => post(`/chats/conversations/${id}/send`, data)

  return {
    getConversation,
    getMessages,
    sendConversation,
    sendMessages,
  }
}
