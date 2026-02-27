import { api } from './client'

function fetchAttendance() {
  return api.get('/attendance')
}

function recordAttendance(payload) {
  return api.post('/attendance', payload)
}

export { fetchAttendance, recordAttendance }

