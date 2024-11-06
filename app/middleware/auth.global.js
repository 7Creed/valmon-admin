const landingPages = [
  '/',
  '/about',
  '/privacy',
  '/faq',
  '/getstarted',
  '/forgotpassword',
  '/login',
  '/privacy',
  '/verifyOtp',
  '/worker',
  '/addlisting',

]

export default defineNuxtRouteMiddleware((to, from) => {
  const authenticated = useCookie('token')
  let allowedRoutes = landingPages.includes(to.path)

  if (authenticated.value && to.path === '/login') {
    return navigateTo('/home')
  }
  if (!authenticated.value && allowedRoutes) {
    return
  }
  if (!authenticated.value && !allowedRoutes) {
    return navigateTo('/login')
  }
})
