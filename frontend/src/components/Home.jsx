import LoginForm from './LoginForm';

const Home = () => {
    return (
        <div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
                Please Enter your Quora credentials to Search
            </div>
            <LoginForm />
        </div>
    )
}

export default Home