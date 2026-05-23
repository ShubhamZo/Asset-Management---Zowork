import React, { useState } from 'react'
import axios from 'axios'

export default function AddAsset({ fetchAssets, closeForm }) {

    const [asset, setAsset] = useState({
        assetName: '',
        assetType: '',
        serialNumber: '',
        purchaseDate: '',
        status: 'Active'
    })
    const [successMessage, setSuccessMessage] = useState('')
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        setAsset({
            ...asset,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post('https://localhost:7059/api/Asset', asset)
            //alert("Asset Added")
            setSuccessMessage("Asset added successfully")
            fetchAssets()
            setTimeout(() => {
                closeForm()
            }, 2000)
        }
        catch (err) {
                setErrorMessage(err.response.data);
        }
    }

    return (
        <div className="card p-3 mb-4">
            <h4>Add Asset</h4>
            {
                successMessage && <div className="alert alert-success"> {successMessage} </div>
            }
            {
                errorMessage && (<p className="text-danger">{errorMessage}</p>)
            }
            <form onSubmit={handleSubmit}>
                <input type="text" name="assetName" placeholder="Asset Name" className="form-control mb-2" onChange={handleChange} />
                <input type="text" name="assetType" placeholder="Asset Type" className="form-control mb-2" onChange={handleChange} />
                <input type="text" name="serialNumber" placeholder="Serial Number" className="form-control mb-2" onChange={handleChange} />
                <input type="date" name="purchaseDate" className="form-control mb-2" onChange={handleChange} />
                {
                /*<select name="status" className="form-control mb-3" onChange={handleChange} >
                    <option value="Active">Active</option>
                    <option value="Issued">Issued</option>
                    <option value="UnderMaintenance">Under Maintenance</option>
                    <option value="Retired">Retired</option>
                </select>
                */}
                <button type="submit" className="btn btn-success me-2" > Save </button>
                <button type="button" className="btn btn-secondary" onClick={closeForm} > Cancel </button>
            </form>
        </div>
    )
}