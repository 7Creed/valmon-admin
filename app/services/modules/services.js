// composables/api/modules/users.js
import { useBaseApi } from '../baseApi'

export const servicesController = () => {
  const { get, post, put, del } = useBaseApi()

  // Users
  const getAppServices = () => get(`services`)
  const getUserByService = (id, query, filters) => {
    let url = `services/${id}/users?page=${query}`
    if (filters.country) {
      url += `&country=${filters.country}`
    }
    if (filters.state) {
      url += `&state=${filters.state}`
    }
    if (filters.rating) {
      url += `&ratings=${filters.rating}`
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
