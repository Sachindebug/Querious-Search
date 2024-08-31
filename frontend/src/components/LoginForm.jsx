import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const navigateSearch = async (e) => {
        e.preventDefault();
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("password", password);
        navigate('/search');
    }

    return (
        <div style={{ width: '350px' }} >
            <div style={{ margin: '15px 0px 9px 0' }}>
                <div style={{ marginBottom: '3px' }}>Email</div>
                <input type="text" placeholder='Enter your email....' onChange={(e) => setEmail(e.target.value)}
                    style={{ lineHeight: '2rem', display: 'block', width: '100%' }} />
            </div>
            <div>
                <div style={{ marginBottom: '3px' }}>
                    Password
                </div>
                <input type="password" onChange={(e) => setPassword(e.target.value)}
                    style={{ lineHeight: '2rem', display: 'block', width: '100%' }} />

            </div>
            <button onClick={navigateSearch}
                style={{ marginTop: '20px', display: 'block', width: '100%' }}> Login</button>


        </div>
    )
}

export default LoginForm