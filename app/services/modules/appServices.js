// composables/api/modules/users.js
import { useBaseApi } from '../baseApi'

export const appServicesController = () => {
  const { get, post, put, del } = useBaseApi()

  const getAppServices = () => get(`/services/`)

  return {

    getAppServices,
  }
}
