import { NavLink } from 'react-router-dom'

function AppLayout({ children }) {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-brand">HRMS Lite Admin</div>
        <nav className="app-nav">
          <NavLink to="/employees" className="nav-link">
            Employees
          </NavLink>
          <NavLink to="/employees/new" className="nav-link">
            Add Employee
          </NavLink>
          <NavLink to="/attendance" className="nav-link">
            Attendance
          </NavLink>
        </nav>
      </header>
      <main className="app-main">{children}</main>
    </div>
  )
}

export default AppLayout

