import React, { useState } from 'react'
import axios from 'axios'

export default function AssetViewTickets({ tickets }) {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

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
                        <th>Created AT</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        tickets.length > 0 ? (tickets.map(tkt => (
                            <tr key={tkt.ticketId}>
                                <td>{tkt.ticketId}</td>
                                <td>{tkt.title}</td>
                                <td>{tkt.description}</td>
                                <td>{tkt.status}</td>
                                <td>{tkt.employeeName || `#${tkt.employeeId}`}</td>
                                <td>{tkt.createdAt?.split('T')[0]}</td>
                            </tr>
                        ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center"> No Tickets found </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}
