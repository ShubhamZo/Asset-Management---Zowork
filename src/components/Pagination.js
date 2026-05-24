import React from 'react'

export default function Pagination({ currentPage, totalPages, setCurrentPage }) {

    return (
        <div className="d-flex justify-content-center mt-3">
            <button className="btn btn-secondary me-2" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} >
                Back
            </button>
            <span className="mt-2">
                Page {currentPage} of {totalPages}
            </span>
            <button className="btn btn-secondary ms-2" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} >
                Next
            </button>
        </div>
    )
}