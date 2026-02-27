import type { CreateEmployeePayload } from '../types'

/** Field-level validation errors for the employee form */
export type EmployeeFormErrors = Partial<Record<keyof CreateEmployeePayload, string>>

const EMPLOYEE_ID_MIN = 1
const EMPLOYEE_ID_MAX = 50
const EMPLOYEE_ID_PATTERN = /^[a-zA-Z0-9_-]+$/

const FULL_NAME_MIN = 2
const FULL_NAME_MAX = 100

const EMAIL_MAX = 254
// Standard email regex (RFC 5322 simplified)
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const DEPARTMENT_MIN = 1
const DEPARTMENT_MAX = 100

/**
 * Validates employee form values and returns field-level errors.
 * Values are trimmed before validation.
 */
export function validateEmployeeForm(
  values: CreateEmployeePayload
): EmployeeFormErrors {
  const errors: EmployeeFormErrors = {}
  const employeeId = values.employee_id?.trim() ?? ''
  const fullName = values.full_name?.trim() ?? ''
  const email = values.email?.trim() ?? ''
  const department = values.department?.trim() ?? ''

  if (!employeeId) {
    errors.employee_id = 'Employee ID is required.'
  } else if (employeeId.length < EMPLOYEE_ID_MIN || employeeId.length > EMPLOYEE_ID_MAX) {
    errors.employee_id = `Employee ID must be between ${EMPLOYEE_ID_MIN} and ${EMPLOYEE_ID_MAX} characters.`
  } else if (!EMPLOYEE_ID_PATTERN.test(employeeId)) {
    errors.employee_id = 'Employee ID can only contain letters, numbers, hyphens, and underscores.'
  }

  if (!fullName) {
    errors.full_name = 'Full name is required.'
  } else if (fullName.length < FULL_NAME_MIN || fullName.length > FULL_NAME_MAX) {
    errors.full_name = `Full name must be between ${FULL_NAME_MIN} and ${FULL_NAME_MAX} characters.`
  }

  if (!email) {
    errors.email = 'Email is required.'
  } else if (email.length > EMAIL_MAX) {
    errors.email = `Email must be at most ${EMAIL_MAX} characters.`
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!department) {
    errors.department = 'Department is required.'
  } else if (department.length < DEPARTMENT_MIN || department.length > DEPARTMENT_MAX) {
    errors.department = `Department must be between ${DEPARTMENT_MIN} and ${DEPARTMENT_MAX} characters.`
  }

  return errors
}

/** Returns trimmed payload for submission; use after validation passes. */
export function getTrimmedPayload(values: CreateEmployeePayload): CreateEmployeePayload {
  return {
    employee_id: values.employee_id?.trim() ?? '',
    full_name: values.full_name?.trim() ?? '',
    email: values.email?.trim() ?? '',
    department: values.department?.trim() ?? '',
  }
}
