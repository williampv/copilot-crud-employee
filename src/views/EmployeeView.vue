<template>
  <div class="card mt-4">
    <div class="card-body">
      <h1 class="card-title mb-4">Employee CRUD</h1>
      <form @submit.prevent="handleSubmit" class="row g-3 mb-4">
        <div class="col-md-4">
          <input v-model="form.firstName" class="form-control" placeholder="First Name" required />
        </div>
        <div class="col-md-4">
          <input v-model="form.lastName" class="form-control" placeholder="Last Name" required />
        </div>
        <div class="col-md-4">
          <input v-model="form.email" class="form-control" placeholder="Email" required />
        </div>
        <div class="col-md-4">
          <input v-model="form.contactNo" class="form-control" placeholder="Contact No" required />
        </div>
        <div class="col-md-4">
          <input v-model="form.city" class="form-control" placeholder="City" required />
        </div>
        <div class="col-md-4">
          <input v-model="form.address" class="form-control" placeholder="Address" required />
        </div>
        <div class="col-12">
          <button type="submit" class="btn btn-primary me-2">
            {{ form.employeeId ? 'Update' : 'Add' }}
          </button>
          <button v-if="form.employeeId" type="button" class="btn btn-secondary" @click="resetForm">
            Cancel
          </button>
        </div>
      </form>
      <hr />
      <div class="table-responsive">
        <table class="table table-bordered table-hover align-middle">
          <thead class="table-light">
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Contact No</th>
              <th>City</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="emp in employees" :key="emp.employeeId ?? 0">
              <td>{{ emp.firstName }}</td>
              <td>{{ emp.lastName }}</td>
              <td>{{ emp.email }}</td>
              <td>{{ emp.contactNo }}</td>
              <td>{{ emp.city }}</td>
              <td>{{ emp.address }}</td>
              <td>
                <button class="btn btn-sm btn-warning me-2" @click="editEmployee(emp)">Edit</button>
                <button class="btn btn-sm btn-danger" @click="deleteEmployee(emp.employeeId ?? 0)">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import employeeService from '../employeeService'

interface Employee {
  employeeId: number | null
  firstName: string
  lastName: string
  email: string
  contactNo: string
  city: string
  address: string
}

const employees = ref<Employee[]>([])
const form = ref<Employee>({
  employeeId: null,
  firstName: '',
  lastName: '',
  email: '',
  contactNo: '',
  city: '',
  address: '',
})

const fetchEmployees = async () => {
  employees.value = await employeeService.getEmployees()
}

const handleSubmit = async () => {
  if (form.value.employeeId) {
    await employeeService.updateEmployee(form.value)
  } else {
    await employeeService.addEmployee(form.value)
  }
  resetForm()
  fetchEmployees()
}

const editEmployee = (emp: Employee) => {
  form.value = { ...emp }
}

const deleteEmployee = async (id: number) => {
  await employeeService.deleteEmployee(id)
  fetchEmployees()
}

const resetForm = () => {
  form.value = {
    employeeId: null,
    firstName: '',
    lastName: '',
    email: '',
    contactNo: '',
    city: '',
    address: '',
  }
}

onMounted(fetchEmployees)
</script>
