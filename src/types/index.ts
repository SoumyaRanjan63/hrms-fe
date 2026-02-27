/** Employee as returned from API (may have id or employee_id) */
export interface Employee {
  id?: number
  employee_id?: string
  full_name?: string
  name?: string
  email?: string
  department?: string
}

/** Payload for creating an employee */
export interface CreateEmployeePayload {
  employee_id: string
  full_name: string
  email: string
  department: string
}

/** API list response shape when items are nested */
export interface EmployeeListResponse {
  items?: Employee[]
}

/** Attendance record from API */
export interface AttendanceRecord {
  id?: number
  employeeId?: number
  employeeName?: string
  date?: string
  status?: string
}

/** Payload for recording attendance */
export interface RecordAttendancePayload {
  employee_id: number
  date: string
  status: string
}

/** API list response for attendance */
export interface AttendanceListResponse {
  items?: AttendanceRecord[]
}

/** Sidebar navigation item */
export interface NavItem {
  to: string
  label: string
}

import type { ReactNode } from 'react'

/** Layout wrapper props */
export interface AppLayoutProps {
  children: ReactNode
}
