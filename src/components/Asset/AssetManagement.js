import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AddAsset from './AddAsset'
import EditAsset from './EditAsset'
import AssignAsset from '../AssignAsset/AssignAsset'
import ReturnAsset from '../AssignAsset/ReturnAsset'
import Pagination from '../Pagination'
import SearchBar from '../searchBar'

export default function AssetManagement() {

    const [assets, setAssets] = useState([])
    const [showAdd, setShowAdd] = useState(false)
    const [editAsset, setEditAsset] = useState(null)
    const [assignAsset, setAssignAsset] = useState(null)
    const [returnAsset, setReturnAsset] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const assetsPerPage = 10
    const [searchTerm, setSearchTerm] = useState('')


    const fetchAssets = async () => {
        try {
            const response = await axios.get('https://localhost:7059/api/Asset')
            setAssets(response.data)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchAssets()
    }, [])

    const deleteAsset = async (id) => {
        if (!window.confirm("Are you sure?"))
            return
        try {
            await axios.delete(`https://localhost:7059/api/Asset/${id}`)
            fetchAssets()
        }
        catch (err) {
            console.log(err)
        }
    }

const filteredAssets = assets.filter((a) =>
    a.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.assetType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.status.toLowerCase().includes(searchTerm.toLowerCase())
)

const indexOfLastAsset = currentPage * assetsPerPage
const indexOfFirstAsset = indexOfLastAsset - assetsPerPage
const currentAssets = filteredAssets.slice(indexOfFirstAsset, indexOfLastAsset)
const totalPages = Math.ceil(filteredAssets.length / assetsPerPage)
{/* 
    console.log("Total Assets:", assets.length)
    console.log("Current Assets:", currentAssets.length)
    console.log(currentAssets)
    */}
return (
    <div>
        <div className="d-flex justify-content-between mb-3">
            <h2>Asset Management</h2>
            <button className="btn btn-primary" onClick={() => setShowAdd(true)} > Add Asset </button>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search assets..." />
        </div>
        {
            showAdd && <AddAsset fetchAssets={fetchAssets} closeForm={() => setShowAdd(false)} />
        }
        {
            editAsset && <EditAsset asset={editAsset} fetchAssets={fetchAssets} closeForm={() => setEditAsset(null)} />
        }
        <table className="table table-bordered table-striped">
            <thead className="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Asset Name</th>
                    <th>Asset Type</th>
                    <th>Serial Number</th>
                    <th>Status</th>
                    <th>Purchase Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    currentAssets.map((asset) => (
                        <tr key={asset.assetId}>
                            <td>{asset.assetId}</td>
                            <td>{asset.assetName}</td>
                            <td>{asset.assetType}</td>
                            <td>{asset.serialNumber}</td>
                            <td>{asset.status}</td>
                            <td>{asset.purchaseDate?.split('T')[0]}</td>
                            <td>
                                {
                                    asset.status === "Issued" ? (
                                        <button className='btn btn-info btn-sm me-2' onClick={() => setReturnAsset(asset)} > Return </button>
                                    ) : (
                                        <button className='btn btn-success btn-sm me-2' onClick={() => setAssignAsset(asset)} > Assign </button>
                                    )
                                }
                                <button className="btn btn-warning btn-sm me-2" disabled={asset.status !== "Active"}
                                    style={{ cursor: asset.status !== "Active" ? "not-allowed" : "pointer" }} onClick={() => setEditAsset(asset)}>
                                    Edit
                                </button>
                                <button className="btn btn-danger btn-sm" disabled={asset.status !== "Active"}
                                    style={{ cursor: asset.status !== "Active" ? "not-allowed" : "pointer" }} onClick={() => deleteAsset(asset.assetId)}>
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
        {
            assignAsset && (<AssignAsset asset={assignAsset} fetchAssets={fetchAssets} closeForm={() => setAssignAsset(null)} />)
        }
        {
            returnAsset && (<ReturnAsset asset={returnAsset} fetchAssets={fetchAssets} closeForm={() => setReturnAsset(null)} />)
        }
    </div>
)
}