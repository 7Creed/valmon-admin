import { useBaseApi } from '../baseApi'

export const authController = () => {
  const { post } = useBaseApi()

  const createUser = userData => post('auth/register', userData)
  const verifyOtp = data => post('auth/verify-otp', data)
  const Resend = data => post('auth/verify/resend', data)
  const forgotPassword = data => post('auth/password/forgot', data)
  const resetPassword = data => post('auth/password/reset', data)
  const loginUser = data => post('auth/login', data)
  const ResetPassword = data => post('account/reset-password', data)
  
  const ping = () => post('account/ping')


  return {
    createUser,
    verifyOtp,
    Resend,
    forgotPassword,
    resetPassword,
    loginUser,
    ResetPassword,
    ping
  }
}
