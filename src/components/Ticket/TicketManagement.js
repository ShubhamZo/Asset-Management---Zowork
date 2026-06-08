import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Pagination from '../Pagination'
import SearchBar from '../searchBar'

export default function TicketManagement() {

    const [tickets, setTickets] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const ticketsPerPage = 10
    const [searchTerm, setSearchTerm] = useState('')

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
                            <th>Assignment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentTickets.length > 0 ?
                                (currentTickets.map((tkt) => (
                                    <tr key={tkt.ticketId}>
                                        <td>{tkt.ticketId}</td>
                                        <td>{tkt.title}</td>
                                        <td>{tkt.description}</td>
                                        <td>{tkt.status}</td>
                                        <td>{tkt.assetName} - { }<small>{tkt.serialNumber}</small>
                                        </td>
                                        <td>{tkt.createdAt?.split('T')[0]}</td>
                                        <td>{tkt.isAssetCurrentlyAssigned ? "Assigned" : "Returned"} </td>
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
            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
        </div>
    )
}
