import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AddEmployee from './AddEmployee'
import EditEmployee from './EditEmployee'

export default function EmployeeManagement() {
    const [employees, setEmployees] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [editEmployees, setEditEmployees] = useState(null);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('https://localhost:7059/api/Employee')
            setEmployees(response.data)
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        fetchEmployees()
    }, [])

    const deleteEmployees = async (id) => {
        if (!window.confirm("Are you Sure?"))
            return
        try {
            await axios.delete(`https://localhost:7059/api/Employee/${id}`)
            fetchEmployees()
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <div>
            <div className="d-flex justify-content-between mb-3">
                <h2>Employee Management</h2>
                <button className='btn btn-primary' onClick={() => setShowAdd(true)}>
                    Add Employee
                </button>
            </div>
            {
                showAdd && <AddEmployee fetchEmployees={fetchEmployees} closeForm={() => setShowAdd(false)} />
            }
            {
                editEmployees && <EditEmployee employee={editEmployees} fetchEmployees={fetchEmployees} closeForm={() => setEditEmployees(null)} />
            }
            <table className="table table-bordered table-striped">

                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        employees.map((emp) => (
                            <tr key={emp.employeeId}>
                                <td>{emp.employeeId}</td>
                                <td>{emp.firstName + ' ' + emp.lastName}</td>
                                <td>{emp.email}</td>
                                <td>{emp.department}</td>
                                <td>
                                    <button type='submit' className='btn btn-success btn-sm me-2' > Assign </button>
                                    <button className="btn btn-warning btn-sm me-2" onClick={() => setEditEmployees(emp)} > Edit </button>
                                    <button className="btn btn-danger btn-sm" onClick={() => deleteEmployees(emp.employeeId)}> Delete </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

