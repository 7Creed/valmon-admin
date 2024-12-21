// composables/api/modules/users.js
import { useAdminBaseApi } from '../../AdminBaseApi'

export const UsersController = () => {
  const { get, post, put, del } = useAdminBaseApi()

  // Users
  const showAllUsers = (page, search) => get(`users?page=${page}&perpage=14&search=${search}`)
  const deleteUser = id => del(`users/${id}`)
  const users = id => get(`users/${id}`)
  const getUsersSummary = () => get(`users/summary`)
  const suspendUser = id => put(`users/${id}/suspend`)
  const restoreUser = id => put(`users/${id}/restore`)


  return {
    showAllUsers,
    deleteUser,
    users,
    getUsersSummary,
    suspendUser,
    restoreUser
  }
}
