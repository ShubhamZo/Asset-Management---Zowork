import React, { act, useEffect, useState } from 'react'
import axios from 'axios'
import ReturnAsset from '../AssignAsset/ReturnAsset'

export default function EmployeeAssetsModal({ employee, closeForm, fetchEmployees }) {

    const [assignments, setAssignments] = useState([])
    const [returnAsset, setReturnAsset] = useState(null)
    const [tickets, setTickets] = useState([])
    const [activeTab, setActiveTab] = useState("assets")

    const fetchAssignments = async () => {
        try {
            const response = await axios.get(`https://localhost:7059/api/AssetAssignment/employee/${employee.employeeId}`)

            //console.log(response.data)
            setAssignments(response.data)
        }
        catch (error) {
            console.log(error)
            //console.log(error.response)
        }
    }

    const fetchTickets = async () => {
        try {
            const response = await axios.get(`https://localhost:7059/api/Ticket/employee/${employee.employeeId}`)
            setTickets(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchAssignments()
    }, [])

    useEffect(() => {
        if (activeTab === "tickets" && tickets.length === 0)
            fetchTickets()
    }, [activeTab])

    return (
        <div className='modal-overlay'>
            <div className='modal-box' style={{
                width: '900px',
                minHeight: '450px',
                maxHeight: '90vh',
                overflow: 'hidden'
            }} >
                <div className='d-flex justify-content-between'>
                    <h3> <strong>#{employee.employeeId}&nbsp;- &nbsp;{employee.firstName}&nbsp;{employee.lastName}</strong> </h3>
                    <button className='btn btn-danger btn-sm' onClick={closeForm} > Close </button>
                </div>
                <div className='mt-3 mb-3'>
                    <button className={`btn me-2 ${activeTab === 'assets' ? 'btn-warning btn-sm' : 'btn-sm btn-secondary'}`}
                        onClick={() => setActiveTab("assets")}>
                        Assets
                    </button>
                    <button className={`btn ${activeTab === 'tickets' ? 'btn-warning btn-sm' : 'btn-sm btn-secondary'}`}
                        onClick={() => setActiveTab('tickets')}>
                        Tickets
                    </button>
                </div>
                <div style={{
                    minHeight: '350px',
                    maxHeight: '450px',
                    overflowY: 'auto'
                }}>
                    {activeTab === 'assets' && (
                        <table className='table table-bordered table-striped mt-3'>
                            <thead className='table-dark'>
                                <tr>
                                    <th>Asset</th>
                                    <th>Serial #</th>
                                    <th>Assigned Date</th>
                                    <th>Expected/Returned</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    assignments.length > 0 ? (
                                        assignments.map((a) => (
                                            <tr key={a.assignmentId}>
                                                <td>{a.assetName}</td>
                                                <td>{a.serialNumber}</td>
                                                <td>{a.assignedDate?.split('T')[0]}</td>
                                                <td>{a.expectedReturnDate?.split('T')[0]}</td>
                                                <td>{a.actualReturnDate ? 'Returned' : 'Issued'}</td>
                                                <td>
                                                    {!a.actualReturnDate && (
                                                        <button className='btn btn-warning btn-sm' onClick={() => setReturnAsset(a)} > Return  </button>)}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center" > No assignment history found </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    )}
                    {activeTab === 'tickets' && (
                        <table className='table table-bordered table-striped mt-3'>
                            <thead className='table-dark'>
                                <tr>
                                    <th>Asset</th>
                                    <th>Ticket ID</th>
                                    <th>Issue</th>
                                    <th>Status</th>
                                    <th>Raised On</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    tickets.length > 0 ? (
                                        tickets.map((t) => (
                                            <tr key={t.ticketId}>
                                                <td>{t.assetName} - {t.serialNumber}</td>
                                                <td>{t.ticketId}</td>
                                                <td>{t.title}</td>
                                                <td>{t.status}</td>
                                                <td>{t.createdAt?.split('T')[0]}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className='text-center'>
                                                No tickets raised
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    )}
                </div>
                {
                    returnAsset && (
                        <ReturnAsset asset={{ assetId: returnAsset.assetId, assetName: returnAsset.assetName }}
                            fetchAssets={fetchAssignments} closeForm={() => setReturnAsset(null)} />
                    )
                }
            </div>
        </div>
    )
}