// composables/api/modules/users.js
import { useAdminBaseApi } from '../../AdminBaseApi'

export const AdminAuthController = () => {
  const { get, post, put, del } = useAdminBaseApi()

  // Users
  const login = data => post(`login`, data)

  return {
    login
  }
}
