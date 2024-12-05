// composables/api/modules/users.js
import { useBaseApi } from '../baseApi'

export const WalletController = () => {
  const { get, post, put, del } = useBaseApi()

  // Users
  const getWallet = () => get(`account/wallet`)
  const getWalletSummary = () => get(`account/wallet/summary`)
  const getWalletTxn = () => get(`account/wallet/transactions`)
  const withdraw = data => post(`account/wallet/withdraw`, data)
  const withdrawOtp = () => post(`/account/wallet/withdraw/otp`)

  return {
    getWallet,
    getWalletSummary,
    getWalletTxn,
    withdraw,
    withdrawOtp,
  }
}
