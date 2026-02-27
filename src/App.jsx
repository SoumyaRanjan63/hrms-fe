import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout.jsx'
import EmployeeListPage from './pages/employees/EmployeeListPage.jsx'
import AddEmployeePage from './pages/employees/AddEmployeePage.jsx'
import AttendancePage from './pages/attendance/AttendancePage.jsx'

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/employees" replace />} />
          <Route path="/employees" element={<EmployeeListPage />} />
          <Route path="/employees/new" element={<AddEmployeePage />} />
          <Route path="/attendance" element={<AttendancePage />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  )
}

export default App

