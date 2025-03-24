import { useFetch } from '#app'

export const useAdminBaseApi = () => {
  //  This function retrieves runtime configuration settings defined in your Nuxt application
  const apiFetch = async (url, options = {}) => {
    const defaults = {
      baseURL: 'https://valmon.techr.me/admin/',
      key: url,
      watch: false,
      // timeout: 10000,
      ...options,
      onRequest({ request, options }) {
        // Add authorization header
        const token = useCookie('token').value
        if (token && token.type === 'Admin') {
          options.headers = {
            ...options.headers,

            Authorization: `Bearer ${token.token}`,
          }
        }
      },
      onResponseError({ request, response, options }) {
        // Handle errors (e.g., redirect on 401)
        if (response.status === 401) {
          navigateTo('/admin')
        }
        // Redirect on 404
      },
    }

    // Call the useFetch function
    const res = useFetch(url, defaults)
    console.log('This is from AdminApi ->', res)

    return res
  }

  const get = (url, options = {}) =>
    apiFetch(url, {
      ...options,
      method: 'GET',
      // Add caching options
      cache: options.cache || 'no-cache',
      dedupe: options.dedupe !== false,
    })

  const post = (url, body, options = {}) =>
    apiFetch(url, { ...options, method: 'POST', body })

  const put = (url, body, options = {}) =>
    apiFetch(url, { ...options, method: 'PUT', body })

  const del = (url, options = {}) =>
    apiFetch(url, { ...options, method: 'DELETE' })

  return {
    apiFetch,
    get,
    post,
    put,
    del,
  }
}
