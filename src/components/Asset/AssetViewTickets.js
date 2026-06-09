import React, { useState } from 'react'
import TicketTable from '../Ticket/TicketTable';
import axios from 'axios'

export default function AssetViewTickets({ tickets, fetchTickets }) {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    return (
        <TicketTable tickets={tickets} showAssign= {true} refreshTickets={fetchTickets} />
    )
}
