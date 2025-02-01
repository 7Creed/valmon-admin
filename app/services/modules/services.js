// composables/api/modules/users.js
import { useBaseApi } from '../baseApi'

export const servicesController = () => {
  const { get, post, put, del } = useBaseApi()

  // Users
  const getAppServices = () => get(`services`)
  const getUserByService = (id, query, location, rating) => {
    let url = `services/${id}/users?page=${query}`
    if (location) {
      url += `&country=${location}`
    }
    if (rating) {
      url += `&ratings=${rating}`
    }

    return get(url)
  }

  // Admin
  const createServices = data => post('admin/create/service', data)

  return {
    getAppServices,
    getUserByService,
    createServices,
  }
}
