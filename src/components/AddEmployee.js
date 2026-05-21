import React, { useState } from 'react'
import axios from 'axios'

export default function AddEmployee({ fetchEmployees, closeForm }) {
    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        email: '',
        department: ''
    });
    const handleChange = (e) => {
        setEmployee({
            ...employee, [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`https://localhost:7059/api/Employee`, employee)
            alert("Employee Added")
            fetchEmployees()
            closeForm()
        }
        catch (err) {
            console.log(err);
        }
    }
    return (
        <div className="card p-3 mb-4">
            <h4>Add Employee</h4>
            <form onSubmit={handleSubmit}>
                <input type="text" name="firstName" placeholder="Frist Name" className="form-control mb-2" onChange={handleChange} />
                <input type="text" name="lastName" placeholder="Last Name" className="form-control mb-2" onChange={handleChange} />
                <input type="email" name='email' placeholder='Email' className='form-control mb-2' onChange={handleChange} />
                <input type="text" name='department' placeholder='Department' className='form-control mb-2' onChange={handleChange} />
                <button type="submit" className="btn btn-success me-2">Save</button>
                <button type='button' className='btn btn-secondary' onClick={closeForm}>Cancel</button>
            </form>
        </div>
    )
}
