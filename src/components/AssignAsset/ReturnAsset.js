import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function ReturnAsset({
    asset,
    closeForm,
    fetchAssets
}) {

    const [assignment, setAssignment] = useState(null)

    const [returnData, setReturnData] = useState({
        actualReturnDate: new Date().toISOString().split('T')[0],
        conditionAtReturn: ''
    })

    useEffect(() => {
        fetchAssignment()
    }, [])

    const fetchAssignment = async () => {

        try {
            const response = await axios.get(
                'https://localhost:7059/api/AssetAssignment'
            )

            const activeAssignment = response.data.find(
                (a) =>
                    a.assetId === asset.assetId && a.actualReturnDate === null
            )
            setAssignment(activeAssignment)
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        setReturnData({
            ...returnData,
            [e.target.name]: e.target.value
        })
    }

    const handleReturn = async (e) => {
        e.preventDefault()
        try {
            await axios.put( `https://localhost:7059/api/AssetAssignment/${assignment.assignmentId}`, returnData )
            alert('Asset Returned Successfully')
            fetchAssets()
            closeForm()
        }
        catch (error) {
            console.log(error)
            alert('Return Failed')
        }
    }

    if (!assignment) {
        return <h4>Loading...</h4>
    }

    return (
        <div className='modal-overlay'>
            <div className='modal-box'>
                <h3>Return Asset</h3>
                <p>
                    <strong>AssetID:</strong> {asset.assetId}
                    <strong>&nbsp;Asset:</strong> {asset.assetName}
                </p>
                <p>
                    <strong>Employee:</strong> {assignment.employeeName}
                </p>
                <form onSubmit={handleReturn}>
                    <label>Return Date</label>
                    <input type='date' name='actualReturnDate' className='form-control mb-3' value={returnData.actualReturnDate} onChange={handleChange} />
                    <label>Condition At Return</label>
                    <textarea name='conditionAtReturn' className='form-control mb-3' onChange={handleChange} />
                    <button type='submit' className='btn btn-warning me-2' > Return Asset </button>
                    <button type='button' className='btn btn-secondary' onClick={closeForm} > Cancel </button>
                </form>
            </div>
        </div>
    )
}