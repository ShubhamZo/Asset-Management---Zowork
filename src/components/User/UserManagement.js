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
    const [showEmployees, setShowEmployees] = useState(false)
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
            `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(value.toLowerCase()) ||
            `${emp.employeeId}`.includes(value)
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
            //setFilteredEmployees(employees)
        }
        catch (error) {
            setSuccessMessage("")

            if (error.response && error.response.data?.message) {
                setErrorMessage(error.response.data.message)
            }
            else {
                setErrorMessage("Error creating user")
            }

            setTimeout(() => {
                setErrorMessage("")
            }, 2000)
        }
    }

    return (
        <div className="card p-4" style={{ minHeight: "550px"}}>
            {
                successMessage && <div className="alert alert-success"> {successMessage} </div>
            }
            {
                errorMessage && <div className="alert alert-danger"> {errorMessage} </div>
            }

            <form onSubmit={handleCreateUser}>
                <div className="row mb-3 align-items-center">
                    <div className="col-md-3">
                        <label className="form-label mb-0">
                            <strong>Role</strong>
                        </label>
                    </div>

                    <div className="col-md-9">
                        <select className="form-select" value={userData.role}
                            onChange={(e) =>
                                setUserData({
                                    ...userData,
                                    role: e.target.value
                                })
                            }
                        >
                            <option value="Employee">Employee</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div>
                </div>
                {
                    userData.role === "Employee" &&
                    <div>
                        <div className="row mb-3 align-items-start">
                            <div className="col-md-3">
                                <label className="form-label mb-0">
                                    <strong>Search Employee</strong>
                                </label>
                            </div>

                            <div className="col-md-9 position-relative">
                                <input type="text" className="form-control" placeholder="Search employee..." value={search} onChange={handleSearch} onFocus={() => setShowEmployees(true)} onBlur={() => {
                                    setTimeout(() => {
                                        setShowEmployees(false)
                                    }, 200)
                                }}
                                />
                            </div>
                        </div>

                        {
                            showEmployees && (
                                <div className="list-group position-absolute start-0 shadow" 
                                    style={{ zIndex:1000, maxHeight: "200px", width: "97%", overflowY: "auto" }} >
                                    {
                                        filteredEmployees.map(emp => (
                                            <button type="button" key={emp.employeeId} className="list-group-item list-group-item-action"
                                                onClick={() => {
                                                    setSelectedEmployee(emp)
                                                    setSearch(`${emp.firstName} ${emp.lastName}`)
                                                    setShowEmployees(false)
                                                }}>
                                                    #{emp.employeeId} - {emp.firstName} {emp.lastName}
                                            </button>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>
                }

                <div className="row mb-3 align-items-center">
                    <div className="col-md-3">
                        <label className="form-label mb-0"> <strong>Username</strong> </label>
                    </div>

                    <div className="col-md-9">
                        <input type="text" className="form-control" value={userData.username} onChange={(e) =>
                            setUserData({
                                ...userData,
                                username: e.target.value
                            })
                        } required />
                    </div>
                </div>

                <div className="row mb-3 align-items-center">
                    <div className="col-md-3">
                        <label className="form-label mb-0"> <strong>Password</strong> </label>
                    </div>

                    <div className="col-md-9">
                        <input type="password" className="form-control" value={userData.password} onChange={(e) =>
                            setUserData({
                                ...userData,
                                password: e.target.value
                            })
                        } required />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" > Create User </button>
            </form>
        </div>
    )
}