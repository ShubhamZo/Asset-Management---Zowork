import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function AssignAsset({ asset, closeForm, fetchAssets }) {

    const [employees, setEmployees] = useState([])
    const [search, setSearch] = useState('')
    const [assignmentData, setAssignmentData] = useState({
        assetId: asset.assetId,
        employeeId: '',
        assignedDate: new Date().toISOString().split('T')[0],
        expectedReturnDate: null,
        conditionAtIssue: ''
    })
    const [successMessage, setSuccessMessage] = useState('')

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('https://localhost:7059/api/Employee')
            setEmployees(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchEmployees()
    }, [])

    const handleChange = (e) => {
        setAssignmentData({
            ...assignmentData,
            [e.target.name]: e.target.value === '' ? null : e.target.value
        })
    }

    const handleAssign = async (e) => {
        e.preventDefault()
        try {
            await axios.post('https://localhost:7059/api/AssetAssignment', assignmentData)
            setSuccessMessage('Asset Assigned Successfully')
            fetchAssets()
            setTimeout(() => {
                closeForm()
            }, 2000)
        }
        catch (error) {
            console.log(error)
            alert('Assignment Failed')
        }
    }

    const filteredEmployees = employees.filter((emp) =>
        `${emp.firstName} ${emp.lastName}`
            .toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className='modal-overlay'>
            <div className='modal-box'>
                <h3>Assign Asset</h3>
                {
                    successMessage && <div className="alert alert-success"> {successMessage} </div>
                }
                <p>
                    <strong>AssetID:</strong> {asset.assetId}
                    <strong>&nbsp;Asset:</strong> {asset.assetName}
                </p>
                <form onSubmit={handleAssign}>
                    <input type='text' placeholder='Search Employee' className='form-control mb-3' value={search} 
                        onChange={(e) => setSearch(e.target.value)} />
                    <select name='employeeId' className='form-control mb-3' onChange={handleChange} required >
                        <option value=''>Select Employee</option>
                        {
                            filteredEmployees.map((emp) => (
                                <option key={emp.employeeId} value={emp.employeeId} >
                                    {emp.firstName} {emp.lastName}
                                </option>
                            ))
                        }
                    </select>
                    <label>Expected Return Date</label>
                    <input type='date' name='expectedReturnDate' className='form-control mb-3' onChange={handleChange} />
                    <label>Condition At Issue</label>
                    <textarea name='conditionAtIssue' className='form-control mb-3' onChange={handleChange} />
                    {
                        asset.status === 'Active' ? 
                        ( <button type='submit' className='btn btn-success me-2'> Assign </button> ) : 
                        ( <div className='alert alert-danger'> This asset cannot be assigned. </div> )
                    }
                    <button type='button' className='btn btn-secondary' onClick={closeForm} > Cancel </button>
                </form>
            </div>
        </div>
    )
}