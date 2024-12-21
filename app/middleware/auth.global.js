const landingPages = [
  '/',
  '/about',
  '/privacy',
  '/faq',
  '/getstarted',
  '/forgotpassword',
  '/resetpassword',
  '/login',
  '/privacy',
  '/verifyOtp',
  '/worker',
  '/addlisting',
  '/profile'

]

export default defineNuxtRouteMiddleware((to, from) => {
  const authenticated = useCookie('token').value ? useCookie('token').value : navigateTo('/login')
  let allowedRoutes = landingPages.includes(to.path)

  if (authenticated && authenticated.type === 'User' && to.path === '/login') {
    return navigateTo('/home')
  }
  if (!authenticated && authenticated.type !== 'User' && allowedRoutes) {
    return
  }
  if (!authenticated && !allowedRoutes) {
    return navigateTo('/login')
  }
})
