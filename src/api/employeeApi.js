import { api } from './client'

function fetchEmployees() {
  return api.get('/employees/')
}

function getEmployees() {
  return fetchEmployees()
}

function createEmployee(payload) {
  return api.post('/employees/', payload)
}

function deleteEmployee(id) {
  return api.delete(`/employees/${id}/`)
}

export { fetchEmployees, getEmployees, createEmployee, deleteEmployee }

