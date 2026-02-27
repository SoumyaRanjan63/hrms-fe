import axios from 'axios'

const API_BASE_URL =
  import.meta?.env?.VITE_API_BASE_URL ||
  import.meta?.env?.API_BASE_URL ||
  '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.response.use(
  response => response?.data,
  error => {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      'Request failed'

    const normalizedError = new Error(message)
    normalizedError.status = error?.response?.status
    normalizedError.data = error?.response?.data

    throw normalizedError
  }
)

export { API_BASE_URL, api }

