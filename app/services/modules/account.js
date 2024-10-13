// composables/api/modules/users.js
import { useBaseApi } from '../baseApi'

export const accountController = () => {
  const { get, post, put, del } = useBaseApi()

  const uploadProfilePicture = userData => post(`account/upload-photo`, userData)
  const addServiceCategory = userData => post(`account/services`, userData)
  const addWorkHours = userData => post(`account/working-hours`, userData)
  const userAccount = () => get('account')

  return {
    uploadProfilePicture,
    addServiceCategory,
    addWorkHours,
    userAccount,
  }
}
