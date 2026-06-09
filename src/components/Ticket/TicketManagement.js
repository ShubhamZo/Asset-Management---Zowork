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
    const filteredTickets = tickets.filter((t) =>
        t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(t.status).toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.assetName?.toLowerCase().includes(searchTerm.toLowerCase())
    )

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
            </div>

            <div style={{ minHeight: '550px' }}>
                <table className="table table-bordered table-striped" style={{ tableLayout: 'fixed', width: '100%' }}>
                    <thead className="table-dark">
                        <tr>
                            <th style={{ width: '80px' }}>ID</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Asset Details</th>
                            <th>Created AT</th>
                            <th>Assigned To</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentTickets.length > 0 ?
                                (currentTickets.map((tkt) => (
                                    <tr key={tkt.ticketId}>
                                        <td>{tkt.ticketId}</td>
                                        <td>{tkt.title}</td>
                                        <td><small>{tkt.description}</small></td>
                                        <td>{tkt.status}</td>
                                        <td>{tkt.assetName} - { }<small>{tkt.serialNumber}</small>
                                        </td>
                                        <td>{tkt.createdAt?.split('T')[0]}</td>
                                        <td>
                                            {
                                                tkt.status === "Open" ? (
                                                    <div>
                                                        <select className="form-select mb-2"
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
                                                                itEmployees.filter(emp => emp.employeeId !== tkt.employeeId)
                                                                    .map(emp => (
                                                                    <option key={emp.employeeId} value={emp.employeeId}>
                                                                        #{emp.employeeId} - {emp.name}
                                                                    </option>
                                                                ))
                                                            }
                                                        </select>
                                                        <button className=" btn btn-sm btn-success " disabled={!selectedEmployee[tkt.ticketId]}
                                                            onClick={() => assignTicket(
                                                                tkt.ticketId
                                                            )
                                                            } > Assign
                                                        </button>
                                                    </div>
                                                ) : (<span> {tkt.assignedEmployeeName || "-"} </span>)
                                            }
                                        </td>
                                    </tr>
                                ))) : (
                                    <tr>
                                        <td colSpan="6" className="text-center"> No Tickets found </td>
                                    </tr>
                                )
                        }
                    </tbody>
                </table>
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
    )
}
