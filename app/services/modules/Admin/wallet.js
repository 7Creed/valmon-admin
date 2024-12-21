// composables/api/modules/users.js
import { useAdminBaseApi } from '../../AdminBaseApi'

export const WalletController = () => {
  const { get, post, put, del } = useAdminBaseApi()

  // Users
  const getWalletSummary = () => get(`transaction/wallet/summary`)
  const walletTransactions = () => get(`transactions/summary`)

  const withdraw = () => post(`wallet/withdraw`)
  const withdrawOtp = () => post(`wallet/withdraw/otp`)

  return {
    getWalletSummary,
    walletTransactions,
    withdraw,
    withdrawOtp
  }
}
