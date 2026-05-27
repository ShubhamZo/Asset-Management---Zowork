import AssetManagement from './Asset/AssetManagement'
import EmployeeManagement from './Employee/EmployeeManagement'
import UserManagement from './User/UserManagement'
import React, { useState } from 'react'

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState("employees");
    const [showUserModal, setShowUserModal] = useState(false)

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
                <a className="navbar-brand" href="#">Admin Dashboard</a>
                <div className="navbar-nav ms-4">
                    <button className="btn btn-dark me-2" onClick={() => setActiveTab("employees")}>
                        Employees
                    </button>
                    <button className="btn btn-dark me-2" onClick={() => setActiveTab("assets")}>
                        Assets
                    </button>
                    <button className="btn btn-dark" onClick={() => setActiveTab("tickets")} >
                        Tickets
                    </button>
                </div>
                <button className="btn btn-dark me-2 ms-auto" onClick={() => setShowUserModal(true)}>
                    <strong>Add User</strong>
                </button>
            </nav>

            <div className="container mt-4">
                {
                    activeTab === "employees" && <EmployeeManagement />
                }
                {
                    activeTab === "assets" && <AssetManagement />
                }
                {
                    activeTab === "tickets" && <h3>Ticket Module...</h3>
                }
                {/*
                    activeTab === "new user" && <UserManagement />
                */}
                {
                    showUserModal && (
                        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                            <div className="modal-dialog modal-dialog-centered modal-lg">
                                <div className="modal-content">
                                    <div className="modal-header bg-primary text-white">
                                        <h5 className="modal-title">Create User</h5>
                                        <button type="button" className="btn-close" onClick={() => setShowUserModal(false)} ></button>
                                    </div>
                                    <div className="modal-body">
                                        <UserManagement />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}