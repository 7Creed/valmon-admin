// composables/api/modules/users.js
import { useBaseApi } from '../baseApi'

export const servicesController = () => {
  const { get, post, put, del } = useBaseApi()

  // Users
  const getAppServices = () => get(`services`)
  const getUserByService = id => get(`services${id}users`)

  // Admin
  const createServices = data => post('admin/create/service', data)

  return {
    getAppServices,
    getUserByService,
    createServices,
  }
}
