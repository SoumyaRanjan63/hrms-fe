import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/layout/Sidebar.tsx'
import Header from './components/layout/Header.tsx'
import EmployeeListPage from './pages/employees/EmployeeListPage.tsx'
import AddEmployeePage from './pages/employees/AddEmployeePage.tsx'
import AttendancePage from './pages/attendance/AttendancePage.tsx'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-gray-100 md:flex-row">
        <Sidebar />
        <div className="flex flex-1 min-w-0 flex-col">
          <Header />
          <main className="flex-1 p-4 overflow-auto md:p-6">
            <Routes>
              <Route path="/" element={<Navigate to="/employees" replace />} />
              <Route path="/employees" element={<EmployeeListPage />} />
              <Route path="/employees/new" element={<AddEmployeePage />} />
              <Route path="/attendance" element={<AttendancePage />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  )
}
