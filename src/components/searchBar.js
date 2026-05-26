import React from 'react'

export default function SearchBar({ searchTerm, setSearchTerm, placeholder }) {

    return (
        <div className="d-flex align-items-center gap-2">
            <input type="text" className="form-control" placeholder={placeholder} value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} style={{ width: '250px' }}
            />
            {
                 searchTerm && ( <button className="btn btn-outline-secondary" onClick={() => setSearchTerm('')} > X </button> )
            }
        </div>
    )
}