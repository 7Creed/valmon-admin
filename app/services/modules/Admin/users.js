// composables/api/modules/users.js
import { useAdminBaseApi } from '../../AdminBaseApi'

export const UsersController = () => {
  const { get, post, put, del } = useAdminBaseApi()

  // Users
  const showAllUsers = (page, perpage, search, pageUrl) => {
    let url

    if (pageUrl) {
      // Use pageUrl if it exists
      url = pageUrl
    }
    else {
      // Construct the URL based on page, perpage, and search
      url = 'users?'
      if (page) url += `page=${page}&`
      if (perpage) url += `perpage=${perpage}&`
      if (search) url += `search=${search}&`
      // Remove the trailing '&' if it exists
      url = url.replace(/&$/, '')
    }

    return get(url)
  }
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
    restoreUser,
  }
}
