import { api } from './client'
import type {
  AttendanceRecord,
  AttendanceListResponse,
  RecordAttendancePayload,
} from '../types'

function fetchAttendance(): Promise<
  AttendanceRecord[] | AttendanceListResponse
> {
  return api.get('/attendance/') as Promise<
    AttendanceRecord[] | AttendanceListResponse
  >
}

function recordAttendance(
  payload: RecordAttendancePayload
): Promise<AttendanceRecord> {
  return api.post('/attendance/', payload) as Promise<AttendanceRecord>
}

export { fetchAttendance, recordAttendance }
