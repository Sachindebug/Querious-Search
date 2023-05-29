import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const searchQueryHandler = (event) => {

    }
    return (
        <div>
            <input
                type="text"
                placeholder='Enter Your question here'
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
            />
            <button>Search</button>
        </div>
    )
}

export default SearchBar