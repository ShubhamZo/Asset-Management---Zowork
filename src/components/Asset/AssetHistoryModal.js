import React, { useEffect, useState } from 'react'
import AssetHistoryTab from './AssetHistoryTab'
import AssetUploadDocsTab from './AssetUploadDocsTab'
import AssetViewDocs from './AssetViewDocs'
import axios from 'axios'

export default function AssetHistoryModal({ asset, closeForm }) {

    const [history, setHistory] = useState([])
    const [activeTab, setActiveTab] = useState('history')
    const [documents, setDocuments] = useState([])

    const fetchHistory = async () => {
        try {
            const response = await axios.get(`https://localhost:7059/api/AssetAssignment/history/${asset.assetId}`)
            setHistory(response.data)
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchHistory()
    }, [])



    const fetchDocuments = async () => {
        try {
            const response = await axios.get(`https://localhost:7059/api/AssetDocument/asset/${asset.assetId}`)
            setDocuments(response.data)
        }
        catch (err) {
            console.log(err)
        }
    }

    const deleteDocument = async (documentId) => {
        if (!window.confirm("Delete this document?"))
            return
        try {
            await axios.delete(`https://localhost:7059/api/AssetDocument/${documentId}`)
            await fetchDocuments()
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
    return (
        <>
            <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }} >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-primary text-white">
                            <h5 className="modal-title">
                                Asset Details
                            </h5>

                            <button className="btn-close" onClick={closeForm} ></button>
                        </div>

                        <div className="modal-body">
                            <h6 className="mb-3">
                                Asset:{" "} <strong>{asset.assetId} - {asset.assetName}</strong>
                            </h6>
                            <div className="d-flex justify-content-center gap-2 mb-3">
                                <button className={`btn ${activeTab === 'history' ? 'btn-warning btn-sm' : 'btn-sm btn-secondary'}`}
                                    onClick={() => setActiveTab('history')} >
                                    Assignment History
                                </button>
                                <button className={`btn ${activeTab === 'upload' ? 'btn-warning btn-sm' : 'btn-sm btn-secondary'}`}
                                    onClick={() => setActiveTab('upload')}>
                                    Upload Documents
                                </button>
                                <button className={`btn ${activeTab === 'viewDocs' ? 'btn-warning btn-sm' : 'btn-sm btn-secondary'}`}
                                    onClick={() => {
                                        setActiveTab("viewDocs")
                                        fetchDocuments()
                                    }}>
                                    View Documents
                                </button>
                            </div>
                            {activeTab === 'history' && (<AssetHistoryTab history={history} />)}
                            {activeTab === 'upload' && (<AssetUploadDocsTab assetId={asset.assetId} />)}
                            {activeTab === 'viewDocs' && (<AssetViewDocs documents={documents} deleteDocument={deleteDocument} />)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}