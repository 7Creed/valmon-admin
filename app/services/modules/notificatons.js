// composables/api/modules/users.js
import { useBaseApi } from '../baseApi'

export const NotificationsController = () => {
  const { get, post, put, del } = useBaseApi()

  // Users
  const getNotifications = () => get(`account/notifications/settings`)
  const createNotifications = data => post(`account/notifications/settings`, data)


  // topNavNotification
  const getAllNotifications = () => get(`notifications`)
  const getUnreadNotifications = () => get(`notifications/unread`)
  const getUnreadMessages = () => get('notifications/unread/messages')
  const markAsRead = () => post(`notifications/read`)
  return {
    getNotifications,
    createNotifications,
    getAllNotifications,
    getUnreadNotifications,
    getUnreadMessages,
    markAsRead
  }
}
