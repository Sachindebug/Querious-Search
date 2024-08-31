import  { useState } from 'react'
import TopResults from './TopResults';
import ReletedQuestions from './ReletedQuestions';
import axios from 'axios';
import './style.css';

const SearchBar = () => {
    const [query, setQuery] = useState("");

    const [results, setResults] = useState([]);
    const [relatedQuestions, setRelatedQuestions] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [searched, setSearched] = useState(false);

    const searchQueryHandler = async (event) => {
        event.preventDefault();
        // setfetched(true);
        try {
            const email = sessionStorage.getItem("email");
            const password = sessionStorage.getItem("password");
            const q = query;
            setQuery("");
            setResults([]);
            setRelatedQuestions([]);
            setSearched(false);
            //updated url
            const { data } = await axios.post('http://127.0.0.1:8080/api/search', {
                email, password, query: q
            });
            console.log(data);

            setResults(data.results);

            setRelatedQuestions(data.related_questions);
            setSearched(true);


        }
        catch (error) {
            console.log(error);

        }
    }
    return (
        <div className='parent'>
            <div className='child1'>
                <div style={{ margin: '0 auto', display: 'flex', width: 'fit-content', padding: '2px 5px' }}>
                    <input
                        type="text"
                        placeholder='Enter Your question here'
                        onChange={(e) => setQuery(e.target.value)}
                        style={{ marginRight: '15px', lineHeight: '2rem', width: '550px' }}
                    />
                    <button onClick={searchQueryHandler}>Search</button>

                </div>
                <TopResults results={results} />

            </div>
            <div className='child2'>
                {relatedQuestions.length > 0 && <ReletedQuestions related_questions={relatedQuestions} />}
            </div>
        </div>
    )
}

export default SearchBar