import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteEmployee, getEmployees } from '../../api/employeeApi'
import { recordAttendance } from '../../api/attendanceApi'
import type { Employee, EmployeeListResponse } from '../../types'
import {
  Alert,
  Button,
  Card,
  CardContent,
  EmptyState,
  LoadingState,
  PageHeader,
} from '../../components/ui'

function resolveEmployees(
  data: Employee[] | EmployeeListResponse | undefined
): Employee[] {
  if (Array.isArray(data)) {
    return data
  }
  if (Array.isArray(data?.items)) {
    return data.items
  }
  return []
}

const ATTENDANCE_STATUS_OPTIONS = [
  { label: 'Present', value: 'Present' },
  { label: 'Absent', value: 'Absent' },
] as const

export default function EmployeeListPage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [attendanceEmployee, setAttendanceEmployee] = useState<Employee | null>(
    null
  )
  const [attendanceDate, setAttendanceDate] = useState(() =>
    new Date().toISOString().slice(0, 10)
  )
  const [attendanceStatus, setAttendanceStatus] = useState<string>('Present')
  const [attendanceSubmitting, setAttendanceSubmitting] = useState(false)
  const [attendanceError, setAttendanceError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    getEmployees()
      .then((data) => {
        if (!isMounted) return
        setEmployees(resolveEmployees(data))
      })
      .catch(() => {})
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [])

  async function handleDelete(employeeId: number | string | undefined) {
    if (employeeId == null) return

    setErrorMessage(null)
    setSuccessMessage(null)

    try {
      await deleteEmployee(employeeId)
      setSuccessMessage('Employee deleted successfully.')
      setTimeout(() => setSuccessMessage(null), 5000)
      const data = await getEmployees()
      setEmployees(resolveEmployees(data))
    } catch (error: unknown) {
      const err = error as { data?: { detail?: string }; message?: string }
      const message =
        err?.data?.detail ?? err?.message ?? 'Failed to delete employee.'
      setErrorMessage(message)
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  function openAddAttendance(employee: Employee) {
    setAttendanceEmployee(employee)
    setAttendanceDate(new Date().toISOString().slice(0, 10))
    setAttendanceStatus('Present')
    setAttendanceError(null)
  }

  async function handleSubmitAttendance() {
    if (attendanceEmployee?.id == null) return
    setAttendanceSubmitting(true)
    setAttendanceError(null)
    try {
      await recordAttendance({
        employee: attendanceEmployee.id,
        date: attendanceDate,
        status: attendanceStatus,
      })
      setAttendanceEmployee(null)
      setSuccessMessage('Attendance recorded successfully.')
      setTimeout(() => setSuccessMessage(null), 5000)
    } catch (error: unknown) {
      const err = error as { data?: { detail?: string }; message?: string }
      setAttendanceError(
        err?.data?.detail ?? err?.message ?? 'Failed to record attendance.'
      )
    } finally {
      setAttendanceSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Employees"
        description="Manage your employee directory"
        action={
          <Link to="/employees/new">
            <Button variant="primary">Add Employee</Button>
          </Link>
        }
      />
      <Card>
        {errorMessage && (
          <Alert variant="error" className="rounded-t-lg border-0 border-b">
            {errorMessage}
          </Alert>
        )}
        {successMessage && (
          <Alert variant="success" className="rounded-t-lg border-0 border-b">
            {successMessage}
          </Alert>
        )}
        <CardContent>
          {loading ? (
            <LoadingState message="Loading employees..." />
          ) : employees?.length === 0 ? (
            <EmptyState
              title="No employees found"
              description="Add your first employee to get started."
              action={
                <Link to="/employees/new">
                  <Button variant="primary">Add Employee</Button>
                </Link>
              }
              icon={<EmptyState.DefaultIcon />}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
                      Employee ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
                      Department
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                {employees?.map((employee) => {
                  const displayEmployeeId =
                    employee?.employee_id ?? employee?.id
                  const deleteEmployeeId = employee?.id

                  return (
                    <tr
                      key={
                        displayEmployeeId ??
                        employee?.email ??
                        employee?.full_name ??
                        employee?.name 
                      }
                      className="hover:bg-gray-50"
                    >
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                        {String(displayEmployeeId ?? '')}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                        {employee?.full_name ?? employee?.name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                        {employee?.email}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                        {employee?.department}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3">
                        <span className="flex flex-wrap items-center gap-2">
                          <Button
                            variant="outline"
                            className="py-1.5! px-3! border-blue-200 text-blue-700 hover:bg-blue-50"
                            onClick={() => openAddAttendance(employee)}
                          >
                            Add attendance
                          </Button>
                          <Button
                            variant="danger"
                            className="py-1.5! px-3!"
                            onClick={() => handleDelete(deleteEmployeeId)}
                          >
                            Delete
                          </Button>
                        </span>
                      </td>
                    </tr>
                  )
                })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {attendanceEmployee != null && (
        <div
          className="fixed inset-0 z-10 flex items-center justify-center bg-black/50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-attendance-title"
        >
          <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
            <h2
              id="add-attendance-title"
              className="text-lg font-semibold text-gray-900"
            >
              Add attendance
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {attendanceEmployee?.full_name ?? attendanceEmployee?.name}
            </p>
            {attendanceError != null && (
              <Alert variant="error" className="mt-3">
                {attendanceError}
              </Alert>
            )}
            <div className="mt-4 space-y-4">
              <div>
                <label
                  htmlFor="attendance-date"
                  className="block text-sm font-medium text-gray-700"
                >
                  Date
                </label>
                <input
                  id="attendance-date"
                  type="date"
                  value={attendanceDate}
                  onChange={(e) => setAttendanceDate(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="attendance-status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  id="attendance-status"
                  value={attendanceStatus}
                  onChange={(e) => setAttendanceStatus(e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  {ATTENDANCE_STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setAttendanceEmployee(null)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleSubmitAttendance}
                disabled={attendanceSubmitting}
              >
                {attendanceSubmitting ? 'Saving…' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
