// composables/api/modules/users.js
import { useBaseApi } from '../baseApi'

export const NotificationsController = () => {
  const { get, post, put, del } = useBaseApi()

  // Users
  const getNotifications = () => get(`account/notifications/settings`)
  const createNotifications = data => post(`account/notifications/settings`, data)

  return {
    getNotifications,
    createNotifications
  }
}
