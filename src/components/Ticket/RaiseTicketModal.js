import React, { useState } from 'react'
import axios from 'axios'

export default function RaiseTicketModal({ asset, closeForm, fetchAssets, fetchOpenTickets }) {
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    })
    const [successMessage, setSuccessMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const user = JSON.parse(localStorage.getItem("user"))
            await axios.post("https://localhost:7059/api/Ticket",
                {
                    title: formData.title,
                    description: formData.description,
                    assetId: asset.assetId,
                    employeeId: user.employeeId
                }
            )
            setSuccessMessage("Ticket Raised")
            await fetchAssets()
            await fetchOpenTickets()
            setTimeout(() => {
                closeForm()
            }, 2000)
        }
        catch (err) {
            console.log(err.response?.data || err)
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header bg-primary text-white">
                        <h5>Raise Ticket</h5>
                        <button className="btn-close" onClick={closeForm} />
                    </div>
                    {
                        successMessage && <div className="alert alert-success"> {successMessage} </div>
                    }
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label>Asset</label>
                                <input className="form-control" value={asset.assetName} disabled />
                            </div>
                            <div className="mb-3">
                                <label>Title</label>
                                <input type="text" name="title" className="form-control" value={formData.title} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label>Description</label>
                                <textarea name="description" rows="4" className="form-control" value={formData.description} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={closeForm} >
                                Cancel
                            </button>

                            <button type="submit" className="btn btn-primary" disabled={loading} >
                                {loading ? "Submitting..." : "Raise Ticket"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}