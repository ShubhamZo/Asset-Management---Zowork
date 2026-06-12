import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReturnAssetModal from '../Asset/ReturnAssetModal'
import RaiseTicketModal from '../Ticket/RaiseTicketModal'
import TicketDetailsModal from '../Ticket/TicketDetailsModal'

export default function EmployeeDashboard() {

    const [assets, setAssets] = useState([])
    const [selectedAsset, setSelectedAsset] = useState(null)
    const [selectedTicketAsset, setSelectedTicketAsset] = useState(null)
    const [openTicket, setOpenTicket] = useState([])
    const [openTicketCount, setOpenTicketCount] = useState(0)
    const [allTickets, setAllTickets] = useState([])
    const [TicketCount, setTicketCount] = useState(0)
    const [activeTab, setActiveTab] = useState("assets")
    const [assignedTickets, setAssignedTickets] = useState([])
    const [selectedTicket, setSelectedTicket] = useState(null)

    const storedUser = localStorage.getItem("user")
    const user = storedUser ? JSON.parse(storedUser) : null
    const employeeId = user.employeeId

    const fetchAssets = async () => {
        try {
            /*const user = JSON.parse(localStorage.getItem("user"))
            
            console.log("EmployeeId:", employeeId)
            */
            const response = await axios.get(`https://localhost:7059/api/AssetAssignment/current-assets/${employeeId}`)
            setAssets(response.data)
        }
        catch (error) {
            console.error(error)
        }
    }

    const fetchOpenTickets = async () => {
        try {

            const [openCountRes, totalCountRes, ticketsRes] = await Promise.all([
                axios.get(`https://localhost:7059/api/Ticket/open-count/${employeeId}`),
                axios.get(`https://localhost:7059/api/Ticket/total-count/${employeeId}`),
                axios.get(`https://localhost:7059/api/Ticket/employee/${employeeId}`)
            ])

            const tickets = ticketsRes.data

            setOpenTicketCount(openCountRes.data)
            setTicketCount(totalCountRes.data)
            //setAllTickets(tickets)
            setOpenTicket(
                tickets.filter(
                    ticket => ticket.employeeId === employeeId
                )
            )
            setAssignedTickets(tickets.filter(
                tickets => tickets.assignedEmployeeId === employeeId
            ))

        } catch (error) {
            console.error("Error loading tickets:", error)
        }
    }

    useEffect(() => {
        if (employeeId) {
            fetchAssets()
            fetchOpenTickets()
        }
    }, [])

    return (
        <div className="container mt-4">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
                <a className="navbar-brand" href="#">Employee Dashboard</a>
            </nav>
            <div className="d-flex justify-content-between mt-3 mb-4">
                <h2>Welcome, {user.username}</h2>
            </div>
            <div className="row mb-4 justify-content-center">
                <div className="col-md-4">
                    <div className={`card shadow ${activeTab === "assets" ? "border-primary" : ""}`}
                        style={{ cursor: "pointer" }}
                        onClick={() => setActiveTab("assets")}>
                        <div className="card-body text-center">
                            <h6 className="text-muted"> Assigned Assets </h6>
                            <h2 className="fw-bold text-primary"> {assets.length} </h2>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className={`card shadow ${activeTab === "Raised" ? "border-danger" : ""}`}
                        style={{ cursor: "pointer" }}
                        onClick={() => setActiveTab("Raised")}>
                        <div className="card-body text-center">
                            <h6 className="text-muted"> Raised Tickets </h6>
                            <h2 className="fw-bold text-danger"> {openTicketCount} </h2>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className={`card shadow ${activeTab === "AssigendTickets" ? "border-warning" : ""}`}
                        style={{ cursor: "pointer" }}
                        onClick={() => setActiveTab("AssignedTickets")} >
                        <div className="card-body text-center">
                            <h6 className="text-muted"> Assigned Tickets </h6>
                            <h2 className="fw-bold text-warning"> {TicketCount} </h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mt-4" style={{ height: "550px" }}>
                {activeTab === "assets" &&
                    <div className="row">
                        {assets.length === 0 ? (
                            <div className="alert alert-info">
                                No assets assigned.
                            </div>
                        ) : (
                            assets.map((asset, index) => (
                                <div key={asset.assignmentId} className="col-md-4 mb-4">
                                    <div className={`card shadow-sm h-100 ${index % 2 === 0 ? "bg-light" : "bg-white"}`}>
                                        <div className="card-body">
                                            <h5 className="card-title">
                                                {asset.assetName}
                                            </h5>
                                            <p> <strong>Type:</strong>{" "} {asset.assetType} </p>
                                            <p> <strong>Serial:</strong>{" "} {asset.serialNumber} </p>
                                            <p> <strong>Assigned:</strong>{" "} {asset.assignedDate?.split('T')[0]} </p>
                                            <p>
                                                <strong>Expected Return:</strong>{" "}
                                                {
                                                    asset.expectedReturnDate
                                                        ? asset.expectedReturnDate.split('T')[0]
                                                        : "N/A"
                                                }
                                            </p>
                                        </div>

                                        <div className="card-footer">
                                            <button className="btn btn-primary btn-sm me-2" onClick={() => setSelectedTicketAsset(asset)}>
                                                Raise Ticket
                                            </button>

                                            <button className="btn btn-warning btn-sm" onClick={() => setSelectedAsset(asset)} >
                                                Return Asset
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                }
                {activeTab === "Raised" && (
                    <table className='table table-bordered table-striped'>
                        <thead className="table-dark">
                            <tr>
                                <th>Asset</th>
                                <th>Title</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Assignment</th>
                            </tr>
                        </thead>

                        <tbody>
                            {openTicket.length > 0 ? (
                                openTicket.map(ticket => (
                                    <tr key={ticket.ticketId} >
                                        <td>{ticket.assetName} - {ticket.serialNumber}</td>
                                        <td>{ticket.title}</td>
                                        <td>{ticket.status}</td>
                                        <td>{ticket.createdAt?.split("T")[0]}</td>
                                        <td>{ticket.isAssetCurrentlyAssigned ? "Assigned" : "Returned"}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        No open tickets
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
                {activeTab === "AssignedTickets" && (
                    <table className="table table-bordered table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th>Asset</th>
                                <th>Ticket</th>
                                <th>Description</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {assignedTickets.length > 0 ? (
                                assignedTickets.map(ticket => (
                                    <tr key={ticket.ticketId} style={{ cursor: "pointer" }} onClick={() => setSelectedTicket(ticket)}>
                                        <td>{ticket.assetName} - {ticket.serialNumber}</td>
                                        <td>{ticket.title}</td>
                                        <td><small>{ticket.description}</small></td>
                                        <td>{ticket.status}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        No tickets
                                    </td>
                                </tr>
                            )
                            }
                        </tbody>

                    </table>
                )}
                {
                    selectedAsset && (
                        <ReturnAssetModal asset={selectedAsset} closeForm={() => setSelectedAsset(null)} fetchAssets={fetchAssets}
                            fetchOpenTickets={fetchOpenTickets} />
                    )
                }
                {
                    selectedTicketAsset && (
                        <RaiseTicketModal asset={selectedTicketAsset} closeForm={() => setSelectedTicketAsset(null)} fetchAssets={fetchAssets}
                            fetchOpenTickets={fetchOpenTickets} />
                    )
                }
                {
                    selectedTicket &&
                    (
                        <TicketDetailsModal ticket={selectedTicket} closeForm={() => setSelectedTicket(null)} fetchOpenTickets={fetchOpenTickets} />
                    )
                }
            </div>
        </div>
    )
}