import { useEffect, useState } from "react"
import axios from "axios"

export default function TicketDetailsModal({ ticket, closeForm, fetchOpenTickets }) {

    const [status, setStatus] = useState(ticket.status)
    const [note, setNote] = useState(ticket.resolutionNote || "")
    const employeeId = JSON.parse(localStorage.getItem("user"))?.employeeId
    
    const save = async () => {
        //console.log("Reached Update async")
        console.log("EmployyID:" + JSON.parse(localStorage.getItem("user"))?.employeeId)
        console.log("LocalStorage" + localStorage)
        await axios.put(`https://localhost:7059/api/Ticket/${ticket.ticketId}/update`,
            {
                status,
                resolutionNote: note,
                employeeId: employeeId
            }

        )

        fetchOpenTickets()
        closeForm()
    }

    useEffect(() => {
        console.log("Selected Ticket:", ticket)
        console.log("Resolution Note:", ticket.resolutionNote)
        setNote(ticket.resolutionNote || "")
        setStatus(ticket.status)
    }, [ticket])

    return (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content" style={{ width: "1050px" }}>
                    <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title">
                            Ticket Details
                        </h5>
                        <button className="btn-close" onClick={closeForm} ></button>
                    </div>

                    <div className="modal-body">
                        <p>
                            <strong>Asset:</strong>&nbsp;{ticket.assetName} - <small>{ticket.serialNumber}</small>
                        </p>
                        <p>
                            <strong>Title:</strong> {ticket.title}
                            <strong>&nbsp;&nbsp;Description:</strong>&nbsp;{ticket.description}
                        </p>
                        <select className="form-select mb-3" value={status} onChange={(e) =>
                            setStatus(e.target.value)
                        }
                        >
                            <option value="InProgress"> In Progress </option>
                            <option value="Resolved"> Resolved </option>
                            <option value="OnHold"> On Hold </option>
                        </select>

                        <textarea className="form-control" rows="3" placeholder="Notes" value={note} onChange={(e) =>
                            setNote(e.target.value)
                        }
                        />
                    </div>

                    <div className="modal-footer">
                        <button className="btn btn-success" onClick={save} >
                            Save
                        </button>
                        <button className="btn btn-secondary" onClick={closeForm}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}