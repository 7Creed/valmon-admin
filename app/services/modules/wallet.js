// composables/api/modules/users.js
import { useBaseApi } from '../baseApi'

export const WalletController = () => {
  const { get, post, put, del } = useBaseApi()

  // Users
  const getWallet = () => get(`account/wallet`)
  const getWalletSummary = () => get(`account/wallet/summary`)
  const getWalletTxn = (page) => {
    let url = `account/wallet/transactions`
    if (page) {
      url += `?page=${page}`
    }
    return get(url)
  }
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
