// composables/api/modules/users.js
import { useAdminBaseApi } from '../../AdminBaseApi'

export const SummaryController = () => {
  const { get, post, put, del } = useAdminBaseApi()
  const summary = () => get(`summary`)

  return {
    summary
  }
}
