import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const navigateSearch = () => {
        if (email.length > 0 && password.length > 0)
            navigate('/search');

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