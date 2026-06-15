import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Login() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            /*
            console.log("Sending:", {
                username,
                password
            })
            */
            const response = await axios.post('https://localhost:7059/api/User/login',
                {
                    username: username,
                    password: password
                }
            )
            //console.log("API Response:", response.data);
            const user = response.data
            localStorage.setItem("user", JSON.stringify(user))
            localStorage.setItem("role", user.role)
            localStorage.setItem("employeeId", user.employeeId)
            //window.location.reload();
            //console.log("Role:", user.role)
            if (user.role === "Admin") {
                navigate('/AdminPage')
            }
            else if (user.role === "Employee") {
                navigate('/EmployeePage')
            }
            window.location.reload();
        }
        catch (err) {
            setError("Invalid username or password")
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card p-4 shadow">
                        <h2 className="text-center mb-4">
                            LOGIN
                        </h2>
                        {
                            error && <div className="alert alert-danger"> {error} </div>
                        }
                        <form onSubmit={handleLogin}>
                            <div className="mb-3">
                                <label className="form-label"> Username </label>
                                <input type="text" className="form-control" placeholder="Enter username" value={username} 
                                    onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input type="password" className="form-control" placeholder="Enter password" value={password} 
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}