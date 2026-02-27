import { useEffect, useState } from 'react'
import { fetchAttendance } from '../../api/attendanceApi'

function AttendancePage() {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let isMounted = true

    setLoading(true)

    fetchAttendance()
      .then(data => {
        if (!isMounted) {
          return
        }

        if (Array.isArray(data)) {
          setRecords(data)
          return
        }

        if (Array.isArray(data?.items)) {
          setRecords(data.items)
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
          <h1>Attendance</h1>
          <p className="page-subtitle">View daily attendance records</p>
        </div>
      </div>
      <div className="page-content">
        {loading ? (
          <p>Loading attendance...</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {records?.length === 0 && (
                <tr>
                  <td colSpan={3}>No attendance records found</td>
                </tr>
              )}
              {records?.map(record => (
                <tr key={record?.id || `${record?.employeeId}-${record?.date}`}>
                  <td>{record?.employeeName}</td>
                  <td>{record?.date}</td>
                  <td>{record?.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default AttendancePage

