// composables/api/modules/users.js
import { useAdminBaseApi } from '../../AdminBaseApi'

export const UsersController = () => {
  const { get, post, put, del } = useAdminBaseApi()

  // Users
  const showAllUsers = () => get(`get_users`)
  const deleteUser = id => del(`delete_users/${id}`)
  const users = id => get(`get_users/${id}`)
  const getUsersSummary = () => get(`users/summary`)


  return {
    showAllUsers,
    deleteUser,
    users,
    getUsersSummary
  }
}
