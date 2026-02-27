import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteEmployee, getEmployees } from '../../api/employeeApi'

function EmployeeListPage() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let isMounted = true

    setLoading(true)

    getEmployees()
      .then(data => {
        if (!isMounted) {
          return
        }

        if (Array.isArray(data)) {
          setEmployees(data)
          return
        }

        if (Array.isArray(data?.items)) {
          setEmployees(data.items)
        }
      })
      .catch(() => {})
      .finally(() => {
        if (isMounted) {
          setLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  function resolveEmployees(data) {
    if (Array.isArray(data)) {
      return data
    }

    if (Array.isArray(data?.items)) {
      return data.items
    }

    return []
  }

  async function handleDelete(employeeId) {
    if (!employeeId) {
      return
    }

    setLoading(true)

    try {
      await deleteEmployee(employeeId)
      const data = await getEmployees()
      const nextEmployees = resolveEmployees(data)
      setEmployees(nextEmployees)
    } catch {
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Employees</h1>
          <p className="page-subtitle">Manage your employee directory</p>
        </div>
        <Link to="/employees/new" className="primary-button">
          Add Employee
        </Link>
      </div>
      <div className="page-content">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Employee ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees?.length === 0 && (
                <tr>
                  <td colSpan={5}>No employees found</td>
                </tr>
              )}
              {employees?.map(employee => {
                const displayEmployeeId = employee?.employee_id ?? employee?.id
                const deleteEmployeeId = employee?.id ?? employee?.employee_id

                return (
                  <tr
                    key={
                      displayEmployeeId ||
                      employee?.email ||
                      employee?.full_name ||
                      Math.random()
                    }
                  >
                    <td>{displayEmployeeId}</td>
                    <td>{employee?.full_name ?? employee?.name}</td>
                    <td>{employee?.email}</td>
                    <td>{employee?.department}</td>
                    <td>
                      <button
                        type="button"
                        className="danger-button"
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
        )}
      </div>
    </div>
  )
}

export default EmployeeListPage

