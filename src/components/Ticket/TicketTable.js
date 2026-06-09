import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function TicketTable({ tickets, showAssign = false, currentEmployeeId = null, refreshTickets = null }) {
    const [itEmployees, setItEmployees] = useState([])
    const [selectedEmployee, setSelectedEmployee] = useState({})

    const fetchItEmployees = async () => {
        try {
            const response = await axios.get("https://localhost:7059/api/Employee/it")
            setItEmployees(response.data)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        if (showAssign) {
            fetchItEmployees()
        }
    }, [showAssign])

    const assignTicket = async (ticketId) => {
        try {
            await axios.put(`https://localhost:7059/api/Ticket/${ticketId}/assign`,
                {
                    employeeId: Number(selectedEmployee[ticketId])
                }
            )
            setSelectedEmployee(prev => ({
                ...prev,
                [ticketId]: ""
            }))

            if (refreshTickets)
                refreshTickets()

        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="table-responsive">
            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Raised By</th>
                        <th>Created At</th>
                        {showAssign &&
                            <th>Action</th>
                        }
                    </tr>
                </thead>

                <tbody>
                    {tickets.length > 0 ?
                        tickets.map(tkt => (
                            <tr key={tkt.ticketId}>
                                <td>{tkt.ticketId}</td>
                                <td>{tkt.title}</td>
                                <td><small>{tkt.description}</small></td>
                                <td>{tkt.status}</td>
                                <td>{tkt.employeeName || `#${tkt.employeeId}`}</td>
                                <td> {tkt.createdAt?.split('T')[0]} </td>
                                {
                                    showAssign && (
                                        <td>
                                            {
                                                tkt.status === "Open" ?
                                                    <div>
                                                        <select className="form-select mb-2" value={selectedEmployee[tkt.ticketId] || ""}
                                                            onChange={(e) => setSelectedEmployee(
                                                                prev => ({
                                                                    ...prev, [tkt.ticketId]: e.target.value
                                                                })
                                                            )
                                                            }>
                                                            <option value=""> Select Employee </option>
                                                            {
                                                                itEmployees.filter(emp => emp.employeeId !== currentEmployeeId)
                                                                    .map(emp => (
                                                                        <option key={emp.employeeId} value={emp.employeeId} >
                                                                            #{emp.employeeId} {" - "} {emp.name}
                                                                        </option>
                                                                    ))
                                                            }
                                                        </select>

                                                        <button className="btn btn-success btn-sm" disabled={!selectedEmployee[tkt.ticketId]}
                                                            onClick={() => assignTicket(tkt.ticketId)}
                                                        >
                                                            Assign
                                                        </button>
                                                    </ div>
                                                    :
                                                    <span>
                                                        {tkt.assignedEmployeeName || "-"}
                                                    </span>
                                            }
                                        </td>
                                    )
                                }
                            </tr>
                        ))
                        :
                        <tr>
                            <td colSpan={showAssign ? 7 : 6} className="text-center">
                                No Tickets found
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    )
}