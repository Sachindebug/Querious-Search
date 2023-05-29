import React from 'react'
import ReletedQuestions from './ReletedQuestions';
import TopResults from './TopResults';
import SearchBar from './SearchBar';
const SearchResult = () => {
    return (
        <div>
            <SearchBar />
            <TopResults />
            <ReletedQuestions />
        </div>
    )
}

export default SearchResult