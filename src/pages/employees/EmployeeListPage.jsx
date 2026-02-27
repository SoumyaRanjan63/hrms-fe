import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchEmployees } from '../../api/employeeApi'

function EmployeeListPage() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let isMounted = true

    setLoading(true)

    fetchEmployees()
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
          <p>Loading employees...</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {employees?.length === 0 && (
                <tr>
                  <td colSpan={3}>No employees found</td>
                </tr>
              )}
              {employees?.map(employee => (
                <tr key={employee?.id || employee?.email || employee?.name}>
                  <td>{employee?.name}</td>
                  <td>{employee?.department}</td>
                  <td>{employee?.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default EmployeeListPage

