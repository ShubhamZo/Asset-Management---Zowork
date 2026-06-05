import React from 'react'

export default function SearchBar({ searchTerm, setSearchTerm, placeholder }) {

    return (
        <div className="position-relative">
            <input type="text" className="form-control" style={{ width: '250px' }} placeholder={placeholder} value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}/>
            {
                 searchTerm && ( <button className="btn btn-sm position-absolute top-50 end-0 translate-middle-y me-2" 
                    onClick={() => setSearchTerm('')} style={{visibility: searchTerm ? 'visible' : 'hidden'}}> X </button> )
            }
        </div>
    )
}