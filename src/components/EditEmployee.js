import React, { useState } from 'react'
import axios from 'axios'

export default function EditEmployee({ employee, fetchEmployees, closeForm }) {

    const [updatedEmployee, setUpdatedEmployee] = useState({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        department: employee.department
    })

    const handleChange = (e) => {
        setUpdatedEmployee({
            ...updatedEmployee, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`https://localhost:7059/api/Employee/${employee.employeeId}`, updatedEmployee)
            alert("Employee Updated")
            fetchEmployees()
            closeForm()
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="card p-3 mb-4">
            <h4>Edit Employee</h4>
            <form onSubmit={handleSubmit}>
                <input type="text" name="firstName" className="form-control mb-2" value={updatedEmployee.firstName} onChange={handleChange} />
                <input type="text" name="lastName" className="form-control mb-2" value={updatedEmployee.lastName} onChange={handleChange} />
                <input type="email" name="email" className="form-control mb-2" value={updatedEmployee.email} onChange={handleChange} />
                <input type="text" name="department" className="form-control mb-2" value={updatedEmployee.department} onChange={handleChange} />
                <button type='submit' className="btn btn-success me-2">
                    Update
                </button>
                <button type="button" className="btn btn-secondary" onClick={closeForm}>
                    Cancel
                </button>
            </form>
        </div>
    )
}