import { api } from './client'

function fetchEmployees() {
  return api.get('/employees')
}

function createEmployee(payload) {
  return api.post('/employees', payload)
}

export { fetchEmployees, createEmployee }

