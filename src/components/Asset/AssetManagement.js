import React, { useEffect, useState } from 'react'
import axios from 'axios'
import AddAsset from './AddAsset'
import EditAsset from './EditAsset'
import AssignAsset from '../AssignAsset/AssignAsset'
import ReturnAsset from '../AssignAsset/ReturnAsset'
import Pagination from '../Pagination'
import SearchBar from '../searchBar'
import AssetHistoryModal from './AssetHistoryModal'

export default function AssetManagement() {

    const [assets, setAssets] = useState([])
    const [showAdd, setShowAdd] = useState(false)
    const [editAsset, setEditAsset] = useState(null)
    const [assignAsset, setAssignAsset] = useState(null)
    const [returnAsset, setReturnAsset] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const assetsPerPage = 10
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedAsset, setSelectedAsset] = useState(null)
    
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

    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm])

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
                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search assets..." />
                <button className="btn btn-primary" onClick={() => setShowAdd(true)} > Add Asset </button>
            </div>
            {
                showAdd && <AddAsset fetchAssets={fetchAssets} closeForm={() => setShowAdd(false)} />
            }
            {
                editAsset && <EditAsset asset={editAsset} fetchAssets={fetchAssets} closeForm={() => setEditAsset(null)} />
            }
            {
                selectedAsset && (<AssetHistoryModal asset={selectedAsset} closeForm={() => setSelectedAsset(null)} />)
            }
            <div style={{ minHeight: '550px' }}>
                <table className="table table-bordered table-striped" style={{ tableLayout: 'fixed', width: '100%' }}>
                    <thead className="table-dark">
                        <tr>
                            <th style={{ width: '80px' }}>ID</th>
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
                            currentAssets.length > 0 ?
                                (currentAssets.map((asset) => (
                                    <tr key={asset.assetId} style={{ cursor: 'pointer' }} onClick={() => setSelectedAsset(asset)}>
                                        <td>{asset.assetId}</td>
                                        <td>{asset.assetName}</td>
                                        <td>{asset.assetType}</td>
                                        <td>{asset.serialNumber}</td>
                                        <td>{asset.status}</td>
                                        <td>{asset.purchaseDate?.split('T')[0]}</td>
                                        <td className="text-nowrap">
                                            {
                                                asset.status === "Issued" ? (
                                                    <button className='btn btn-info btn-sm me-2' onClick={(e) => { e.stopPropagation(); setReturnAsset(asset) }} > Return </button>
                                                ) : (
                                                    <button className='btn btn-success btn-sm me-2' onClick={(e) => { e.stopPropagation(); setAssignAsset(asset) }} > Assign </button>
                                                )
                                            }
                                            <button className="btn btn-warning btn-sm me-2" disabled={asset.status !== "Active"}
                                                style={{ cursor: asset.status !== "Active" ? "not-allowed" : "pointer" }} onClick={(e) => { e.stopPropagation(); setEditAsset(asset) }}>
                                                Edit
                                            </button>
                                            <button className="btn btn-danger btn-sm" disabled={asset.status !== "Active"}
                                                style={{ cursor: asset.status !== "Active" ? "not-allowed" : "pointer" }} onClick={(e) => { e.stopPropagation(); deleteAsset(asset.assetId) }}>
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))) : (
                                    <tr>
                                        <td colSpan="7" className="text-center"> No assets found </td>
                                    </tr>
                                )
                        }
                    </tbody>
                </table>
            </div>
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
