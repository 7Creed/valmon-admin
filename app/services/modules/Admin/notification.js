import { useAdminBaseApi } from '../../AdminBaseApi'

export const NotificationController = () => {
  const { get, post, put, del } =  useAdminBaseApi()

  // topNavNotification
  const getAllNotifications = () => get(`notifications`)
  const getUnreadNotifications = () => get(`notifications/unread`)
  const markAsRead = () => post(`notifications/read`)
  return {
    getAllNotifications,
    getUnreadNotifications,
    markAsRead
  }
}
