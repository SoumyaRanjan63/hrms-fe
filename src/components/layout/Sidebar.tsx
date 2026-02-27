import { NavLink } from 'react-router-dom'
import type { NavItem } from '../../types'

const navItems: NavItem[] = [
  { to: '/employees', label: 'Employees' },
  { to: '/attendance', label: 'Attendance' },
]

export default function Sidebar() {
  return (
    <aside className="flex w-full shrink-0 flex-row items-center gap-0 py-3 px-4 bg-white border-b border-gray-200 shadow-sm md:w-60 md:min-w-[240px] md:flex-col md:items-stretch md:border-b-0 md:border-r md:py-6 md:px-0">
      <div className="text-lg font-semibold text-gray-900 tracking-tight pr-4 pb-0 md:px-5 md:pb-5">
        HRMS
      </div>
      <nav className="flex flex-1 flex-row gap-0 md:flex-col md:flex-none md:gap-1">
        {navItems.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to !== '/employees'}
            className={({ isActive }) =>
              `block px-3 py-2 text-sm font-medium no-underline transition-colors md:px-5 md:py-2.5 md:text-[0.9375rem] ${
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
