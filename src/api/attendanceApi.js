import { apiClient } from './client'

function fetchAttendance() {
  return apiClient('/attendance')
}

function recordAttendance(payload) {
  return apiClient('/attendance', {
    method: 'POST',
    body: payload
  })
}

export { fetchAttendance, recordAttendance }

