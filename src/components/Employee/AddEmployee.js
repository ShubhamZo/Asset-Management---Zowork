import React, { useState } from 'react'
import axios from 'axios'

export default function AddEmployee({ fetchEmployees, closeForm }) {
    const departments = ["HR", "IT", "Development", "Testing", "Finance", "Operations", "Sales", "Support"]
    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        email: '',
        department: ''
    });
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleChange = (e) => {
        setEmployee({
            ...employee, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setSuccessMessage('')
        setErrorMessage('')
        try {
            await axios.post(`https://localhost:7059/api/Employee`, employee)
            //alert("Employee Added")
            setSuccessMessage("Employee added successfully")
            fetchEmployees()
            {/*setTimeout(() => {
                closeForm()
            }, 2000) */}
            setTimeout(() => {
                setSuccessMessage('')
                setEmployee({ firstName: '', lastName: '', email: '', department: '' })
            }, 2000)
        }
        catch (err) {
            if (err.response?.status === 500) {
                setErrorMessage("Email already exists")
            }
            else {
                setErrorMessage("Something went wrong")
            }
            setTimeout(() => {
                setErrorMessage('')
            }, 2000)
            console.log(err);
        }
    }
    return (
        <div className="card p-3 mb-4">
            <h4>Add Employee</h4>
            {
                successMessage && <div className="alert alert-success"> {successMessage} </div>
            }
            {
                errorMessage && <div className="alert alert-danger"> {errorMessage} </div>
            }
            <form onSubmit={handleSubmit}>
                <input type="text" name="firstName" placeholder="First Name" className="form-control mb-2" onChange={handleChange} value={employee.firstName} />
                <input type="text" name="lastName" placeholder="Last Name" className="form-control mb-2" onChange={handleChange} value={employee.lastName} />
                <input type="email" name='email' placeholder='Email' className='form-control mb-2' onChange={handleChange} value={employee.email} />
                <select name="department" className="form-select mb-2" value={employee.department} onChange={handleChange} value={employee.department}>
                    <option value="">Select Department</option> {
                        departments.map((dept) => (<option key={dept} value={dept}> {dept} </option>))
                    }
                </select>
                <button type="submit" className="btn btn-success me-2">Save</button>
                <button type='button' className='btn btn-secondary' onClick={closeForm}>Cancel</button>
            </form>
        </div>
    )
}
