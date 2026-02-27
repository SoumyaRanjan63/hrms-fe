import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createEmployee } from '../../api/employeeApi'

function AddEmployeePage() {
  const navigate = useNavigate()
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    department: '',
    role: ''
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
      await createEmployee(formValues)
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
            <label htmlFor="name">Full name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formValues.name}
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
          <div className="form-row">
            <label htmlFor="role">Role</label>
            <input
              id="role"
              name="role"
              type="text"
              value={formValues.role}
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

