// composables/api/modules/users.js
import { useBaseApi } from '../../baseApi'

export const UsersController = () => {
  const { get, post, put, del } = useBaseApi()

  // Users
  const getAdmin = () => get(`admin/get-admins`)
  const addAdmin = data => post('admin/get-admins', data)

  return {
    addAdmin,
    getAdmin
  }
}
