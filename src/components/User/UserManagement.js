import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function UserManagement() {

    const [employees, setEmployees] = useState([])
    const [filteredEmployees, setFilteredEmployees] = useState([])
    const [search, setSearch] = useState("")
    const [selectedEmployee, setSelectedEmployee] = useState(null)
    const [userData, setUserData] = useState({
        username: '',
        password: '',
        role: 'Employee'
    })

    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const fetchEmployees = async () => {
        try {
            const response = await axios.get("https://localhost:7059/api/Employee/available")
            setEmployees(response.data)
            setFilteredEmployees(response.data)
            console.log(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchEmployees()
    }, [])

    const handleSearch = (e) => {
        const value = e.target.value
        setSearch(value)
        const filtered = employees.filter(emp =>
            `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(value.toLowerCase())
        )
        setFilteredEmployees(filtered)
    }

    const handleCreateUser = async (e) => {
        e.preventDefault()
        if (userData.role === "Employee" && !selectedEmployee) {
            setErrorMessage("Please select an employee")
            return
        }
        try {
            const payload = {
                username: userData.username,
                password: userData.password,
                role: userData.role,
                employeeId: userData.role === "Admin" ? null : selectedEmployee?.employeeId
            }

            await axios.post("https://localhost:7059/api/User", payload)
            await fetchEmployees()
            setSuccessMessage("User created successfully")
            setTimeout(() => {
                setSuccessMessage("")
            }, 2000)
            setErrorMessage("")
            setUserData({
                username: '',
                password: '',
                role: 'Employee'
            })
            setSelectedEmployee(null)
            setSearch("")
            setFilteredEmployees(employees)
        }
        catch (error) {
            setSuccessMessage("")
            if (error.response) {
                setErrorMessage(error.response.data)
            }
            else {
                setErrorMessage("Error creating user")
            }
        }
    }

    return (
        <div className="card p-4">
            <h3 className="mb-4">Create User</h3>
            {
                successMessage && <div className="alert alert-success"> {successMessage} </div>
            }
            {
                errorMessage && <div className="alert alert-danger"> {errorMessage} </div>
            }

            <form onSubmit={handleCreateUser}>
                <div className="mb-3">
                    <label className="form-label"> <strong>Role</strong> </label>
                    <select className="form-select" value={userData.role}
                        onChange={(e) =>
                            setUserData({
                                ...userData, role: e.target.value
                            })
                        }>
                        <option value="Employee"> Employee </option>
                        <option value="Admin"> Admin</option>
                    </select>
                </div>
                {
                    userData.role === "Employee" &&
                    <div>
                        <div className="mb-3">
                            <label className="form-label"> <strong>Search Employee </strong></label>
                            <input type="text" className="form-control" placeholder="Search employee..." value={search} onChange={handleSearch} />
                        </div>

                        <div className="list-group mb-3" style={{ maxHeight: "200px", overflowY: "auto" }} >
                            {
                                filteredEmployees.map(emp => (
                                    <button
                                        type="button" key={emp.employeeId} className={`list-group-item list-group-item-action 
                                            ${selectedEmployee?.employeeId === emp.employeeId ? "active" : ""}`}
                                        onClick={() =>
                                            setSelectedEmployee(emp)}> {emp.firstName} {emp.lastName} </button>
                                ))
                            }
                        </div>

                        {
                            selectedEmployee && <div className="alert alert-info"> Selected Employee:
                                <strong> {" "} {selectedEmployee.firstName} {selectedEmployee.lastName}</strong> </div>
                        }
                    </div>
                }

                <div className="mb-3">
                    <label className="form-label"><strong>Username</strong>  </label>

                    <input type="text" className="form-control" value={userData.username}
                        onChange={(e) =>
                            setUserData({
                                ...userData,
                                username: e.target.value
                            })
                        }
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label"><strong> Password </strong> </label>
                    <input
                        type="password" className="form-control" value={userData.password}
                        onChange={(e) =>
                            setUserData({
                                ...userData,
                                password: e.target.value
                            })
                        } required />
                </div>

                <button type="submit" className="btn btn-primary" > Create User </button>
            </form>
        </div>
    )
}