import axios, { type AxiosInstance } from 'axios'

const API_BASE_URL =
  import.meta?.env?.VITE_API_BASE_URL ||
  import.meta?.env?.API_BASE_URL ||
  'http://127.0.0.1:8000/api'

export const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  if (config.method?.toLowerCase() === 'delete') {
    const headers = { ...config.headers } as Record<string, unknown>
    delete headers['Content-Type']
    config.headers = headers as typeof config.headers
  }
  return config
})

api.interceptors.response.use(
  (response) => response?.data,
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      'Request failed'

    const normalizedError = new Error(message) as Error & {
      status?: number
      data?: unknown
    }
    normalizedError.status = error?.response?.status
    normalizedError.data = error?.response?.data

    throw normalizedError
  }
)

export { API_BASE_URL }
