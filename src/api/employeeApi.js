import { apiClient } from './client'

function fetchEmployees() {
  return apiClient('/employees')
}

function createEmployee(payload) {
  return apiClient('/employees', {
    method: 'POST',
    body: payload
  })
}

export { fetchEmployees, createEmployee }

