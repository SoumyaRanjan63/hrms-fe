import { useCallback, useEffect, useState } from 'react'
import { fetchAttendance } from '../../api/attendanceApi'
import type {
  AttendanceRecord,
  AttendanceListResponse,
} from '../../types'
import {
  Card,
  CardContent,
  EmptyState,
  ErrorState,
  LoadingState,
  PageHeader,
} from '../../components/ui'

function resolveRecords(
  data:
    | AttendanceRecord[]
    | AttendanceListResponse
    | undefined
): AttendanceRecord[] {
  if (Array.isArray(data)) return data
  if (Array.isArray(data?.items)) return data.items
  return []
}

export default function AttendancePage() {
  const [records, setRecords] = useState<AttendanceRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadAttendance = useCallback(() => {
    setError(null)
    setLoading(true)
    fetchAttendance()
      .then((data) => {
        setRecords(resolveRecords(data))
      })
      .catch((err: unknown) => {
        const msg =
          (err as { data?: { detail?: string }; message?: string })?.data
            ?.detail ??
          (err as Error)?.message ??
          'Failed to load attendance.'
        setError(msg)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    let isMounted = true
    fetchAttendance()
      .then((data) => {
        if (!isMounted) return
        setError(null)
        setRecords(resolveRecords(data))
      })
      .catch((err: unknown) => {
        if (!isMounted) return
        const msg =
          (err as { data?: { detail?: string }; message?: string })?.data
            ?.detail ??
          (err as Error)?.message ??
          'Failed to load attendance.'
        setError(msg)
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className="space-y-6">
      <PageHeader
        title="Attendance"
        description="View daily attendance records"
      />
      <Card>
        <CardContent>
          {loading ? (
            <LoadingState message="Loading attendance..." />
          ) : error != null ? (
            <ErrorState message={error} onRetry={loadAttendance} />
          ) : records?.length === 0 ? (
            <EmptyState
              title="No attendance records"
              description="Record attendance from the Employees page."
              icon={<EmptyState.DefaultIcon />}
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
                      Employee Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
                      Employee ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-600">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                {records?.map((record) => {
                  const emp =
                    record?.employee &&
                    typeof record.employee === 'object' &&
                    !Array.isArray(record.employee)
                      ? record.employee
                      : undefined
                  return (
                    <tr
                      key={
                        record?.id ??
                        `${record?.employee_id ?? emp?.employee_id ?? ''}-${record?.date ?? ''}`
                      }
                      className="hover:bg-gray-50"
                    >
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                        {emp?.name ?? record?.employee_name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                        {emp?.employee_id ?? record?.employee_id}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                        {record?.date}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-900">
                        {record?.status}
                      </td>
                    </tr>
                  )
                })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
