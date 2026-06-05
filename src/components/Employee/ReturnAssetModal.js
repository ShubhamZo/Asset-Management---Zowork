import React, { useState } from 'react'
import axios from 'axios'

export default function ReturnAssetModal({ asset, closeForm, fetchAssets }) {
    const [condition, setCondition] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            await axios.put('https://localhost:7059/api/AssetAssignment/return',
                {
                    assignmentId: asset.assignmentId,
                    conditionAtReturn: condition
                }
            )
            fetchAssets()
            closeForm()

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <div className="modal-backdrop fade show"></div>

            <div className="modal show d-block" tabIndex="-1">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header bg-primary text-white">
                            <h5 className="modal-title"> Return Asset </h5>
                            <button className="btn-close" onClick={closeForm} />
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <p> <strong>Asset:</strong>{" "} {asset.assetName} </p>
                                <div className="mb-3">
                                    <label className="form-label"> Condition At Return </label>
                                    <textarea className="form-control" rows="3" value={condition} onChange={(e) => setCondition(e.target.value)} required />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={closeForm} > Cancel </button>
                                    <button type="submit" className="btn btn-warning" > Return Asset </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}