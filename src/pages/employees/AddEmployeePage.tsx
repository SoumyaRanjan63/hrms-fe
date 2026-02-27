import { useState, type FormEvent, type ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { createEmployee } from '../../api/employeeApi'
import {
  getTrimmedPayload,
  validateEmployeeForm,
  type EmployeeFormErrors,
} from '../../lib/employeeFormValidation'
import type { CreateEmployeePayload } from '../../types'
import { Alert, Button, Card, CardContent, PageHeader } from '../../components/ui'

const initialFormValues: CreateEmployeePayload = {
  employee_id: '',
  full_name: '',
  email: '',
  department: '',
}

const inputBaseClass =
  'block w-full rounded-lg border px-3 py-2 text-gray-900 shadow-sm focus:outline-none focus:ring-1'
const inputErrorClass = 'border-red-500 focus:border-red-500 focus:ring-red-500'
const inputValidClass =
  'border-gray-300 focus:border-blue-500 focus:ring-blue-500'

export default function AddEmployeePage() {
  const navigate = useNavigate()
  const [formValues, setFormValues] =
    useState<CreateEmployeePayload>(initialFormValues)
  const [fieldErrors, setFieldErrors] = useState<EmployeeFormErrors>({})
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setFormValues((current) => ({
      ...current,
      [name]: value,
    }))
    if (fieldErrors[name as keyof CreateEmployeePayload]) {
      setFieldErrors((current) => ({ ...current, [name]: undefined }))
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    const errors = validateEmployeeForm(formValues)
    setFieldErrors(errors)
    if (Object.keys(errors).length > 0) return

    setSubmitting(true)
    const payload = getTrimmedPayload(formValues)
    try {
      await createEmployee(payload)
      navigate('/employees')
    } catch (err: unknown) {
      const message =
        (err as { data?: { message?: string }; message?: string })?.data
          ?.message ||
        (err as Error)?.message ||
        'Unable to create employee. Please try again.'
      setError(message)
    } finally {
      setSubmitting(false)
    }
  }

  function inputClass(field: keyof CreateEmployeePayload) {
    return fieldErrors[field]
      ? `${inputBaseClass} ${inputErrorClass}`
      : `${inputBaseClass} ${inputValidClass}`
  }

  return (
    <div className="mx-auto max-w-md space-y-6">
      <PageHeader
        title="Add Employee"
        description="Create a new employee record"
      />
      <Card>
        <CardContent className="p-6">
          <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label
              htmlFor="employee_id"
              className="block text-sm font-medium text-gray-700"
            >
              Employee ID
            </label>
            <input
              id="employee_id"
              name="employee_id"
              type="text"
              value={formValues.employee_id}
              onChange={handleChange}
              required
              aria-invalid={Boolean(fieldErrors.employee_id)}
              aria-describedby={fieldErrors.employee_id ? 'employee_id-error' : undefined}
              className={inputClass('employee_id')}
            />
            {fieldErrors.employee_id && (
              <p id="employee_id-error" className="text-sm text-red-600" role="alert">
                {fieldErrors.employee_id}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="full_name"
              className="block text-sm font-medium text-gray-700"
            >
              Full name
            </label>
            <input
              id="full_name"
              name="full_name"
              type="text"
              value={formValues.full_name}
              onChange={handleChange}
              required
              aria-invalid={Boolean(fieldErrors.full_name)}
              aria-describedby={fieldErrors.full_name ? 'full_name-error' : undefined}
              className={inputClass('full_name')}
            />
            {fieldErrors.full_name && (
              <p id="full_name-error" className="text-sm text-red-600" role="alert">
                {fieldErrors.full_name}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formValues.email}
              onChange={handleChange}
              required
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? 'email-error' : undefined}
              className={inputClass('email')}
            />
            {fieldErrors.email && (
              <p id="email-error" className="text-sm text-red-600" role="alert">
                {fieldErrors.email}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <label
              htmlFor="department"
              className="block text-sm font-medium text-gray-700"
            >
              Department
            </label>
            <input
              id="department"
              name="department"
              type="text"
              value={formValues.department}
              onChange={handleChange}
              required
              aria-invalid={Boolean(fieldErrors.department)}
              aria-describedby={fieldErrors.department ? 'department-error' : undefined}
              className={inputClass('department')}
            />
            {fieldErrors.department && (
              <p id="department-error" className="text-sm text-red-600" role="alert">
                {fieldErrors.department}
              </p>
            )}
          </div>
          {error && (
            <Alert variant="error">{error}</Alert>
          )}
          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              disabled={submitting}
            >
              {submitting ? 'Saving...' : 'Save Employee'}
            </Button>
          </div>
        </form>
        </CardContent>
      </Card>
    </div>
  )
}
