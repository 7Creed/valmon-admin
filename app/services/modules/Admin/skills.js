// composables/api/modules/users.js
import { useAdminBaseApi } from '../../AdminBaseApi'

export const SKillsController = () => {
  const { get, post, put, del } = useAdminBaseApi()
  const skillSummary = () => get('skills/transactions')
  const parentCategory = () => get('skills/categories')
  const subCategory = id => get(`skills/${id}/sub-categories`)
  const customer = id => get(`skills/${id}/customers`)
  const deleteSC = id => del(`services/${id}`)
  const editSC = (id, data) => put(`services/${id}`, data)

  // Admin
  const createCategory = data => post('create/category', data)

  const createSubCategory = data => post(`create/service`, data)

  return {
    skillSummary,
    parentCategory,
    subCategory,
    customer,
    createSubCategory,
    createCategory,
    deleteSC,
    editSC,
  }
}
