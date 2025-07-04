import { useFetch, useCookie } from '#app'
import { useGlobalStore } from '~/store'

export const useBaseApi = () => {
  //  This function retrieves runtime configuration settings defined in your Nuxt application
  const apiFetch = async (url, options = {}) => {
    const defaults = {
      baseURL: 'https://valmon.ctrixx.com/api/',
      key: url,
      watch: false,
      // timeout: 10000,
      ...options,
      onRequest({ request, options }) {
        // Add authorization header
        const token = useCookie('token').value
        if (token && token.type === 'User') {
          options.headers = {
            ...options.headers,

            Authorization: `Bearer ${token.token}`,
          }
        }
      },
      onResponseError({ request, response, options }) {
        const store = useGlobalStore()
        // console.log('response', response)
        // Handle errors (e.g., redirect on 401)
        // if (response.status === 401) {
        //   // Reset the User Information
        //   store.UserAccount = null

        //   navigateTo('/login')
        // }
        // Redirect on 404
      },
    }

    // Call the useFetch function
    const res = useFetch(url, defaults)
    // console.log('This is from BaseApi ->', res)

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

  const patch = (url, body, options = {}) =>
    apiFetch(url, { ...options, method: 'PACTH', body })

  const put = (url, body, options = {}) =>
    apiFetch(url + `?_method=PUT`, { ...options, method: 'POST', body })

  const del = (url, options = {}) =>
    apiFetch(url, { ...options, method: 'DELETE' })

  return {
    apiFetch,
    get,
    post,
    put,
    del,
    patch,
  }
}
