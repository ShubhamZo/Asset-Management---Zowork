import React, {useState} from 'react'
import axios from 'axios'

export default function AssetViewDocs({ documents, deleteDocument }) {
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleDelete = async (documentId) => {
        try {
            await deleteDocument(documentId);
            setMessage("Documetn Deleted Successfully")
            setError("")
            setTimeout(() => {
                setMessage("")
            }, 2000);
        }
        catch (err) {
            setError("Failed to Delete")
            setMessage("")
            setTimeout(() => {
                setMessage("")
            }, 2000);
        }
    }
    return (
        <div>
            {message && ( <div className="alert alert-success"> {message} </div> )}
            {error && ( <div className="alert alert-danger"> {error} </div> )}
            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>File Name</th>
                        <th>Uploaded Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        documents.length > 0 ? (documents.map(doc => (
                            <tr key={doc.documentId}>
                                <td>{doc.fileName}</td>
                                <td>{doc.uploadedDate?.split('T')[0]}</td>
                                <td><a href={`https://localhost:7059${doc.filePath}`} target="_blank" rel="noreferrer"
                                    className="btn btn-primary btn-sm me-2" > View </a>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(doc.documentId)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                        ) : (
                            <tr>
                                <td colSpan="3" className="text-center"> No documents found </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )
}
