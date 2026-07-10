import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Pagination from '../Pagination'
import SearchBar from '../searchBar'

export default function TicketManagement() {

    const [tickets, setTickets] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const ticketsPerPage = 10
    const [searchTerm, setSearchTerm] = useState('')
    const [itEmployees, setItEmployees] = useState([])
    const [showAssignTo, setShowAssignTo] = useState(null)
    const [selectedEmployee, setSelectedEmployee] = useState({})
    const [selectedTicket, setSelectedTicket] = useState(null)
    const [statusFilter, setStatusFilter] = useState("")


    const fetchTickets = async () => {
        try {
            const response = await axios.get('https://localhost:7059/api/Ticket')
            console.log(response.data)
            setTickets(response.data)

        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchTickets()
    }, [])

    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm])

    const fetchItEmployees = async () => {
        try {
            const response = await axios.get("https://localhost:7059/api/Employee/it")
            setItEmployees(response.data)
            console.log(response.data)
        }
        catch (err) {
            console.log(err)
        }
    }

    const assignTicket = async (ticketId) => {
        try {
            await axios.put(`https://localhost:7059/api/Ticket/${ticketId}/assign`, {
                employeeId: Number(selectedEmployee[ticketId])
            })
            setSelectedEmployee(prev => ({
                ...prev, [ticketId]: ""
            }))
            setShowAssignTo(null)
            fetchTickets()
        }
        catch (err) {
            console.log(err)
        }

    }
    const filteredTickets = tickets.filter((t) => {
        const matchesSearch =
            t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            String(t.status).toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.assetName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.assignedEmployeeName.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesStatus = statusFilter === "" ? true : t.status === statusFilter

        return matchesSearch && matchesStatus
    })


    const closeTicket = async (ticketId, status) => {
        try {
            await axios.put(`https://localhost:7059/api/Ticket/${ticketId}/status`,
                {
                    status
                }
            )
            setTickets(prev =>
                prev.map(ticket =>
                    ticket.ticketId === ticketId ? { ...ticket, status } : ticket
                )
            )
            fetchTickets()
        }
        catch (err) {
            console.log(err)
        }
    }

    const indexOfLastTicket = currentPage * ticketsPerPage
    const indexOfFirstTickets = indexOfLastTicket - ticketsPerPage
    const currentTickets = filteredTickets.slice(indexOfFirstTickets, indexOfLastTicket)
    const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage)
    {/* 
    console.log("Total Assets:", assets.length)
    console.log("Current Assets:", currentAssets.length)
    console.log(currentAssets)
    */}
    return (
        <div>
            <div className="d-flex justify-content-between mb-3">
                <h2>Ticket Management</h2>
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search tickets..." />
                <div className="d-flex gap-2">
                    <button className={`badge btn btn-sm rounded-pill px-2 py-1 ${statusFilter === "Open" ? "text-bg-danger" : "btn-light border border-danger text-danger"}`}
                        onClick={() => {
                            setStatusFilter(
                                statusFilter === "Open" ? "" : "Open"
                            )
                            setCurrentPage(1)
                        }}>Open
                    </button>
                    <button className={`badge btn btn-sm rounded-pill px-2 py-1 fw-bold ${statusFilter === "Resolved" ? "text-bg-primary" : "btn-light border border-primary text-primary"}`}
                        onClick={() => {
                            setStatusFilter(
                                statusFilter === "Resolved" ? "" : "Resolved"
                            )
                            setCurrentPage(1)
                        }}>Resolved
                    </button>
                    <button className={`badge btn btn-sm rounded-pill px-2 py-1 fw-bold ${statusFilter === "Closed" ? "text-bg-warning" : "btn-light border border-warning text-warning"}`}
                        onClick={() => {
                            setStatusFilter(
                                statusFilter === "Closed" ? "" : "Closed"
                            )
                            setCurrentPage(1)
                        }}>Closed
                    </button>
                </div>
            </div>

            <div style={{ minHeight: '550px' }}>
                <table className="table table-bordered table-striped" style={{ tableLayout: 'fixed', width: '100%' }}>
                    <thead className="table-dark">
                        <tr>
                            <th style={{ width: '80px' }}>ID</th>
                            <th>Title</th>
                            <th>Raised By</th>
                            <th style={{ width: '130px' }}>Status</th>
                            <th>Asset Details</th>
                            <th style={{ width: '120px' }}>Created AT</th>
                            <th style={{ width: '250px' }}>Assigned To</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentTickets.length > 0 ?
                                (currentTickets.map((tkt) => (
                                    <tr key={tkt.ticketId} style={{ cursor: "pointer" }} onClick={() => setSelectedTicket(tkt)}>
                                        <td style={{ width: "80px" }}>{tkt.ticketId}</td>
                                        <td>{tkt.title}</td>
                                        <td>{tkt.employeeName}</td>
                                        <td>{tkt.status === "Resolved" ? (
                                            <select className="form-select mb-3" value={tkt.status} onClick={(e) => { e.stopPropagation() }}
                                                onChange={(e) =>
                                                    closeTicket(
                                                        tkt.ticketId,
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="Resolved">Resolved</option>
                                                <option value="Closed">Closed</option>
                                            </select>
                                        ) : (
                                            <span>{tkt.status}</span>
                                        )}

                                        </td>
                                        <td>{tkt.assetName} - { }<small>{tkt.serialNumber}</small>
                                        </td>
                                        <td >{tkt.createdAt?.split('T')[0]}</td>
                                        <td onClick={(e) => { e.stopPropagation() }}>
                                            {
                                                tkt.status === "Open" ? (
                                                    <div className="d-flex align-items-center gap-2">
                                                        {/*console.log("Ticket:", tkt.ticketId)}
                                                            {console.log("Raised by:", tkt.employeeId)}
                                                            {console.log("IT Employees:", itEmployees)*/}
                                                        <select className="form-select"
                                                            style={{ minWidth: 0 }}
                                                            value={selectedEmployee[tkt.ticketId] || ""}
                                                            onFocus={() => {
                                                                if (itEmployees.length === 0) {
                                                                    fetchItEmployees()
                                                                }
                                                            }}
                                                            onChange={(e) =>
                                                                setSelectedEmployee({
                                                                    ...selectedEmployee,
                                                                    [tkt.ticketId]: e.target.value
                                                                })
                                                            }>
                                                            <option value=""> Select Employee </option>
                                                            {
                                                                itEmployees.filter(emp => emp.employeeId != tkt.employeeId)
                                                                    .map(emp => (
                                                                        <option key={emp.employeeId} value={emp.employeeId}>
                                                                            #{emp.employeeId} - {emp.name}
                                                                        </option>
                                                                    ))
                                                            }
                                                        </select>
                                                        <button className=" btn btn-sm btn-success " disabled={!selectedEmployee[tkt.ticketId]}
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                assignTicket(tkt.ticketId)
                                                            }} >&#10003;
                                                        </button>
                                                    </div>
                                                ) : (<span> {tkt.assignedEmployeeName || "-"} </span>)
                                            }
                                        </td>
                                    </tr>
                                ))) : (
                                    <tr>
                                        <td colSpan="7" className="text-center"> No Tickets found </td>
                                    </tr>
                                )
                        }
                    </tbody>
                </table>
            </div>
            {
                selectedTicket && (
                    <div className="modal d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header bg-primary text-white">
                                    <h5 className="modal-title"> Resolution Note </h5>
                                    <button className="btn-close" onClick={() => setSelectedTicket(null)} />
                                </div>

                                <div className="modal-body">
                                    <p><strong>Ticket:</strong> {" "} {selectedTicket.title}</p>
                                    <p><strong>Description:</strong>{" "} {selectedTicket.description}</p>
                                    <textarea className="form-control" rows="5" disabled
                                        value={
                                            selectedTicket.resolutionNote ||
                                            "No resolution note available"
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
    )
}
