import React, { useRef, useState } from 'react'
import axios from 'axios';

export default function AssetUploadDocsTab({assetId}) {
    const fileInputRef = useRef(null);
    const [files, setFiles] = useState([]);
    const [uploadMessage, setUploadMessage] = useState("");
    const [uploadError, setUploadError] = useState("");

    const handleUpload = async () => {
        console.log(files)
        const formData = new FormData()
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i])
        }
        //formData.append('assetId', asset.assetId)
        try {
            console.log("AssetId:", assetId)
            await axios.post(`https://localhost:7059/api/AssetDocument/upload?AssetId=${assetId}`, formData)
            console.log(formData)
            //alert("File Uploaded Successfully")
            setUploadMessage("Document uploaded successfully.");
            setFiles([]);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
            setUploadError("");
            setTimeout(() => {
                setUploadMessage("");
            }, 2000);
        }
        catch (err) {
            //console.log("FULL ERROR:", err)
            setUploadMessage("");
            setUploadError("Upload Failed")
        }
    }
    return (
        <div>
            <div className='card p-3'>
                {uploadMessage && (<div className="alert alert-success"> {uploadMessage} </div>)}
                {uploadError && (<div className="alert alert-danger"> {uploadError} </div>)}
                <div className='mb-3'>
                    <input ref={fileInputRef} type='file' className='form-control' multiple onChange={(e) => setFiles(e.target.files)} />
                </div>
                <button className='btn btn-success' onClick={handleUpload} disabled={!files || files.length === 0}>Upload</button>
            </div>
        </div>
    )
}
