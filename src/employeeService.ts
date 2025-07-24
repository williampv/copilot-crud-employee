// Employee service using real API calls
const API_URL = 'http://localhost:8000/api/employees'

export default {
  async getEmployees() {
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error('Failed to fetch employees')
    return await res.json()
  },
  async addEmployee(emp: any) {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emp),
    })
    if (!res.ok) throw new Error('Failed to add employee')
    return await res.json()
  },
  async updateEmployee(emp: any) {
    const res = await fetch(`${API_URL}/${emp.employeeId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emp),
    })
    if (!res.ok) throw new Error('Failed to update employee')
    return await res.json()
  },
  async deleteEmployee(id: number) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    })
    if (!res.ok) throw new Error('Failed to delete employee')
    return await res.json()
  },
}
