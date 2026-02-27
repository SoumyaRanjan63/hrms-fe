const API_BASE_URL =import.meta?.env?.API_BASE_URL 

async function apiClient(endpoint, options = {}) {
  const { method = 'GET', headers, body } = options

  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(headers || {})
    }
  }

  if (body) {
    config.body = JSON.stringify(body)
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config)

  if (!response?.ok) {
    let errorBody = null

    try {
      errorBody = await response.json()
    } catch {
      errorBody = null
    }

    const error = new Error(errorBody?.message || 'Request failed')
    error.status = response.status
    error.data = errorBody
    throw error
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

export { API_BASE_URL, apiClient }

