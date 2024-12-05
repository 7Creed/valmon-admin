// composables/api/modules/users.js
import { useBaseApi } from '../baseApi'

export const servicesController = () => {
  const { get, post, put, del } = useBaseApi()

  // Users
  const getAppServices = () => get(`services`)
  const getUserByService = (id, query, location, rating) => get(`services/${id}/users?page=${query}?country=${location}&ratings=${rating}`)

  // Admin
  const createServices = data => post('admin/create/service', data)

  return {
    getAppServices,
    getUserByService,
    createServices,
  }
}
