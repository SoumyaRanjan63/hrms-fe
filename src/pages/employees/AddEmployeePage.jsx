import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createEmployee } from '../../api/employeeApi'

function AddEmployeePage() {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({
    employee_id: '',
    full_name: '',
    email: '',
    department: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setFormValues(current => ({
      ...current,
      [name]: value
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      await createEmployee({
        employee_id: formValues.employee_id,
        full_name: formValues.full_name,
        email: formValues.email,
        department: formValues.department
      })
      navigate('/employees')
    } catch (err) {
      const message =
        err?.data?.message ||
        err?.message ||
        'Unable to create employee. Please try again.'
      setError(message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1>Add Employee</h1>
          <p className="page-subtitle">Create a new employee record</p>
        </div>
      </div>
      <div className="page-content">
        <form className="form" onSubmit={handleSubmit}>
          <div className="form-row">
            <label htmlFor="employee_id">Employee ID</label>
            <input
              id="employee_id"
              name="employee_id"
              type="text"
              value={formValues.employee_id}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <label htmlFor="full_name">Full name</label>
            <input
              id="full_name"
              name="full_name"
              type="text"
              value={formValues.full_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formValues.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <label htmlFor="department">Department</label>
            <input
              id="department"
              name="department"
              type="text"
              value={formValues.department}
              onChange={handleChange}
            />
          </div>
          {error && <p className="form-error">{error}</p>}
          <div className="form-actions">
            <button
              type="submit"
              className="primary-button"
              disabled={submitting}
            >
              {submitting ? 'Saving...' : 'Save Employee'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddEmployeePage

