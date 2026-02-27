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

/** Nested employee object when API returns expanded attendance */
export interface AttendanceEmployee {
  id: number
  employee_id: string
  name: string
}

/** Attendance record from API (snake_case as returned); supports nested employee or flat fields */
export interface AttendanceRecord {
  id?: number
  date?: string
  status?: string
  created_at?: string
  /** Nested when API expands employee, or raw FK number */
  employee?: number | AttendanceEmployee
  /** Flat fallbacks when API returns denormalized fields */
  employee_name?: string
  employee_id?: string
}

/** Payload for recording attendance (POST /attendance/) */
export interface RecordAttendancePayload {
  employee: number
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
