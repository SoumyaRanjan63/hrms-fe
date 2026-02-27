import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteEmployee, getEmployees } from '../../api/employeeApi'
import type { Employee, EmployeeListResponse } from '../../types'

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

export default function EmployeeListPage() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Employees</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your employee directory
          </p>
        </div>
        <Link
          to="/employees/new"
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Add Employee
        </Link>
      </div>
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
        {errorMessage && (
          <div className="border-b border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="border-b border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {successMessage}
          </div>
        )}
        {loading ? (
          <p className="p-6 text-gray-500">Loading...</p>
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
                {employees?.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                      No employees found
                    </td>
                  </tr>
                )}
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
                        <button
                          type="button"
                          className="rounded-lg border border-red-200 bg-white px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                          onClick={() => handleDelete(deleteEmployeeId)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
