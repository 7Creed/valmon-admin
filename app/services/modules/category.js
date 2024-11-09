import { useBaseApi } from '../baseApi'

export const categoryController = () => {
  const { get, post } = useBaseApi()

  // Admin
  const createCategory = data => post('admin/create/category', data)
  const getCategory_Services = () => get('categories')

  // Public services view
  const getPublicCategory_Services = () => get('get/categories')

  return {
    createCategory,
    getCategory_Services,
    getPublicCategory_Services
  }
}
