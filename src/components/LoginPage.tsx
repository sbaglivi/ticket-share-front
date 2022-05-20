import { useState } from 'react';
type LoginPageProps = {
    setToken: Function
}
const LoginPage: React.FC<LoginPageProps> = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        let body = JSON.stringify({ username, password });
        console.log(body)
        const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: body
        }
        )
        if (response.ok) {
            let token = await response.json();
            console.log(token);
        }

    }
    const checkLogin = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        let response = await fetch('http://localhost:5000/check', {
            credentials: 'include'
        });
        if (response.ok) {
            let result = await response.text();
            console.log(result)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type='text' name='username' placeholder='Username' onChange={e => setUsername(e.target.value)} />
                <input type='password' name='password' placeholder='Password' onChange={e => setPassword(e.target.value)} />
                <button>Login</button>
            </form>
            <form onSubmit={checkLogin}>
                <p>{message}</p>
                <button>Check</button>
            </form>
        </div>
    )
}

export default LoginPage;