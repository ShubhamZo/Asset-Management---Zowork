import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReturnAsset from './AssignAsset/ReturnAsset'

export default function EmployeeAssetsModal({ employee, closeForm, fetchEmployees}) {

    const [assignments, setAssignments] = useState([])
    const [returnAsset, setReturnAsset] = useState(null)

    useEffect(() => {
        fetchAssignments()
    }, [])

    const fetchAssignments = async () => {
        try {
            const response = await axios.get( `https://localhost:7059/api/AssetAssignment/employee/${employee.employeeId}`)
            setAssignments(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='modal-overlay'>
            <div className='modal-box' style={{ width: '700px' }} >
                <div className='d-flex justify-content-between'>
                    <h3> <strong>#{employee.employeeId}&nbsp;- &nbsp;{employee.firstName}&nbsp;{employee.lastName}</strong> </h3>
                    <button className='btn btn-danger btn-sm' onClick={closeForm} > Close </button>
                </div>

                <table className='table table-bordered mt-3'>
                    <thead className='table-dark'>
                        <tr>
                            <th>Asset</th>
                            <th>Assigned Date</th>
                            <th>Expected/Return</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            assignments.map((a) => (
                                <tr key={a.assignmentId}>
                                    <td>{a.assetName}</td>
                                    <td>{a.assignedDate?.split('T')[0]}</td>
                                    <td>{a.expectedReturnDate ?.split('T')[0]}</td>
                                    <td>{a.actualReturnDate ? 'Returned' : 'Issued'}</td>
                                    <td>
                                        { !a.actualReturnDate && ( 
                                            <button className='btn btn-warning btn-sm' onClick={() => setReturnAsset(a) } > Return  </button> ) } 
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
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