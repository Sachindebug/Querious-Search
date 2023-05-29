import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const navigateSearch = async (e) => {
        e.preventDefault();
        console.log("clicked");
        try {
            console.log("Apihit");
            const response = await axios.post('http://localhost:3000/api/posts', {
                email, password
            });
            console.log("Sachchhchchc");

            console.log(response);

            setEmail("");
            setPassword("");
            navigate('/search');

        }
        catch (error) {
            console.log(error);
        }
        // if (email.length > 0 && password.length > 0) {

        // }
    }
    return (
        <div>
            <div>
                Email:
                <input type="text" placeholder='Enter your email....' onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                Password:
                <input type="password" onChange={(e) => setPassword(e.target.value)} />
                <button onClick={navigateSearch}> Login</button>
            </div>


        </div>
    )
}

export default LoginForm