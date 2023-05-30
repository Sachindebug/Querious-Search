import React, { useState } from 'react'
import TopResults from './TopResults';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [users, setUsers] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);


    const navigate = useNavigate();

    const searchQueryHandler = async (event) => {
        event.preventDefault();
        // setfetched(true);
        try {
            const email = sessionStorage.getItem("email");
            const password = sessionStorage.getItem("password");
            const q = query;
            setQuery("");
            setUsers([]);
            setQuestions([]);
            setAnswers([]);

            const { data } = await axios.post('http://localhost:3000/api/search', {
                email, password, query: q
            });
            console.log(data);
            setUsers(data.users);
            setQuestions(data.questions);
            setAnswers(data.answers);


        }
        catch (error) {
            console.log(error);

        }
    }
    return (
        <div>
            <div style={{ margin: '0 auto', display: 'block', width: 'fit-content', padding: '2px 5px' }}>
                <input
                    type="text"
                    placeholder='Enter Your question here'
                    onChange={(e) => setQuery(e.target.value)}
                    style={{ marginRight: '15px', lineHeight: '2rem', width: '550px' }}
                />
                <button onClick={searchQueryHandler}>Search</button>

            </div>


            <TopResults users={users} questions={questions} answers={answers} />
        </div>
    )
}

export default SearchBar