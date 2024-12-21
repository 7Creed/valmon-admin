// composables/api/modules/users.js
import { useAdminBaseApi } from '../../AdminBaseApi'

export const SettingsController = () => {
  const { get, post, put, del } = useAdminBaseApi()
  // Settings
  const updateAdmin = data => post('update', data)
  const ResetPassword = data => post('password', data)
  const createNotification = data => post('settings/notifications', data)
  const getNotification = () => get('settings/notifications')
  const setPlatformRates = data => post('settings/platform', data)
  const getPlatformRates = () => get('settings/platform')
  // Manage Admin=
  const createAdmin = data => post(`add-admin`, data)
  const deleteAdmin = data => del(`delete-admin`, data)
  const getAdmin = () => get(`get-admins`)
  return {
    createAdmin,
    deleteAdmin,
    getAdmin,
    updateAdmin,
    ResetPassword,
    createNotification,
    getNotification,
    setPlatformRates,
    getPlatformRates
  }
}
