import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AddEmployee from './AddEmployee'
import EditEmployee from './EditEmployee'
import AssignEmployeeAsset from '../AssignAsset/AssignEmployeeAsset'
import EmployeeAssetsModal from './EmployeeAssetModal'

export default function EmployeeManagement() {
    const [employees, setEmployees] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [editEmployees, setEditEmployees] = useState(null);
    const [assignEmployee, setAssignEmployee] = useState(null)
    const [selectedEmployee, setSelectedEmployee] = useState(null)

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
                showAdd &&
                <AddEmployee fetchEmployees={fetchEmployees} closeForm={() => setShowAdd(false)} />
            }
            {
                editEmployees &&
                <EditEmployee employee={editEmployees} fetchEmployees={fetchEmployees} closeForm={() => setEditEmployees(null)} />
            }
            {
                assignEmployee &&
                <AssignEmployeeAsset employee={assignEmployee} fetchEmployees={fetchEmployees} closeForm={() => setAssignEmployee(null)} />
            }
            {
                selectedEmployee &&
                (<EmployeeAssetsModal employee={selectedEmployee} fetchEmployees={fetchEmployees} closeForm={() => setSelectedEmployee(null)} />)
            }
            <table className="table table-bordered table-striped table-hover">

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
                            <tr key={emp.employeeId} style={{ cursor: 'pointer' }} onClick={() => setSelectedEmployee(emp)}>
                                <td>{emp.employeeId}</td>
                                <td>{emp.firstName + ' ' + emp.lastName}</td>
                                <td>{emp.email}</td>
                                <td>{emp.department}</td>
                                <td>
                                    <button className='btn btn-success btn-sm me-2' onClick={(e) => { e.stopPropagation(); setAssignEmployee(emp) }} >
                                        Assign
                                    </button>
                                    <button className="btn btn-warning btn-sm me-2" onClick={(e) => { e.stopPropagation(); setEditEmployees(emp) }} >
                                        Edit
                                    </button>
                                    <button className="btn btn-danger btn-sm" onClick={(e) => { e.stopPropagation(); deleteEmployees(emp.employeeId) }}>
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

