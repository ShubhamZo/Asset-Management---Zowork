import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function AssignEmployeeAsset({ employee, closeForm, fetchEmployees }) {

    const [assets, setAssets] = useState([])
    const [search, setSearch] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [assignmentData, setAssignmentData] = useState({
        assetId: '',
        employeeId: employee.employeeId,
        assignedDate: new Date().toISOString().split('T')[0],
        expectedReturnDate: '',
        conditionAtIssue: ''
    })

    const fetchAssets = async () => {
        try {
            const response = await axios.get('https://localhost:7059/api/Asset')
            const availableAssets = response.data.filter((asset) => asset.status !== 'Issued')
            setAssets(availableAssets)
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchAssets()
    }, [])
    
    const handleChange = (e) => {
        setAssignmentData({
            ...assignmentData,
            [e.target.name]: e.target.value
        })
    }

    const handleAssign = async (e) => {
        e.preventDefault()

        try {
            await axios.post('https://localhost:7059/api/AssetAssignment', assignmentData)
            setSuccessMessage('Asset Assigned Successfully')
            fetchEmployees()
            setTimeout(() => {
            closeForm()
            }, 2000)
        }
        catch (error) {
            console.log(error)
            alert('Assignment Failed')
        }
    }

    const filteredAssets = assets.filter((asset) =>
        asset.assetName.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className='modal-overlay'>
            <div className='modal-box'>
                <h3>Assign Asset</h3>
                {
                    successMessage && <div className="alert alert-success"> {successMessage} </div>
                }
                <p>
                    <strong>Employee:</strong>
                    {' '}
                    {employee.firstName} {employee.lastName}
                </p>

                <form onSubmit={handleAssign}>
                    <input type='text' placeholder='Search Asset' className='form-control mb-3' value={search} 
                        onChange={(e) => setSearch(e.target.value)} />
                    <select name='assetId' className='form-control mb-3' onChange={handleChange} required >
                        <option value=''> Select Asset </option>
                        {
                            filteredAssets.map((asset) => (
                                <option key={asset.assetId} value={asset.assetId} >
                                    {asset.assetName}
                                    {' - '}
                                    {asset.serialNumber}
                                </option>
                            ))
                        }
                    </select>
                    <label>Expected Return Date</label>
                    <input type='date' name='expectedReturnDate' className='form-control mb-3' onChange={handleChange} />
                    <label>Condition At Issue</label>
                    <textarea name='conditionAtIssue' className='form-control mb-3' onChange={handleChange} />
                    <button type='submit' className='btn btn-success me-2' > Assign </button>
                    <button type='button' className='btn btn-secondary' onClick={closeForm} > Cancel </button>
                </form>
            </div>
        </div>
    )
}