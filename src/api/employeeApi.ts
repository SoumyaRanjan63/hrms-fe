import { api } from './client'
import type { CreateEmployeePayload, Employee, EmployeeListResponse } from '../types'

function fetchEmployees(): Promise<Employee[] | EmployeeListResponse> {
  return api.get('/employees/') as Promise<Employee[] | EmployeeListResponse>
}

function getEmployees(): Promise<Employee[] | EmployeeListResponse> {
  return fetchEmployees()
}

function createEmployee(payload: CreateEmployeePayload): Promise<Employee> {
  return api.post('/employees/', payload) as Promise<Employee>
}

function deleteEmployee(id: number | string): Promise<void> {
  return api.delete(`/employees/${id}/`) as Promise<void>
}

export { fetchEmployees, getEmployees, createEmployee, deleteEmployee }
