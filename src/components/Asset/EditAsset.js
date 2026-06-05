import React, { useState } from 'react'
import axios from 'axios'

export default function EditAsset({ asset, fetchAssets, closeForm }) {
    const [updatedAsset, setUpdatedAsset] = useState({
        assetName: asset.assetName,
        assetType: asset.assetType,
        serialNumber: asset.serialNumber,
        status: asset.status,
        purchaseDate: asset.purchaseDate?.split('T')[0]
    })
    const [successMessage, setSuccessMessage] = useState('')

    const handleChange = (e) => {
        setUpdatedAsset({
            ...updatedAsset,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            /*if (updatedAsset.status === 'Retired') {
                await axios.delete(`https://localhost:7059/api/Asset/${asset.assetId}`)
                setSuccessMessage("Asset Retired successfully")
            }
            else {
            */
            await axios.put(`https://localhost:7059/api/Asset/${asset.assetId}`, updatedAsset)
            //alert("Asset Updated")
            setSuccessMessage("Asset updated successfully")

            fetchAssets()
            setTimeout(() => {
                closeForm()
            }, 2000)
        }
        catch (err) {
            console.log(err.response?.data || err)
        }
    }
    return (
        <div className="card p-3 mb-4">
            <h4>Edit Asset</h4>
            {
                successMessage && <div className="alert alert-success"> {successMessage} </div>
            }
            <form onSubmit={handleSubmit}>
                <input type="text" name="assetName" className="form-control mb-2" value={updatedAsset.assetName} onChange={handleChange} />
                <input type="text" name="assetType" className="form-control mb-2" value={updatedAsset.assetType} onChange={handleChange} />
                <input type="text" name="serialNumber" className="form-control mb-2" value={updatedAsset.serialNumber} onChange={handleChange} />
                <select name="status" className="form-control mb-3" value={updatedAsset.status} onChange={handleChange} >
                    <option value="Active">Active</option>
                    {/*<option value="Issued">Issued</option>*/}
                    <option value="UnderMaintenance">Under Maintenance</option>
                    <option value="Retired">Retired</option>
                </select>
                <input type="date" name="purchaseDate" className="form-control mb-2" value={updatedAsset.purchaseDate} onChange={handleChange} />
                <button type="submit" className="btn btn-success me-2" > Update </button>
                <button type="button" className="btn btn-secondary" onClick={closeForm} > Cancel </button>
            </form>
        </div>
    )
}