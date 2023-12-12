import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    async function register(ev) {
        ev.preventDefault();
        // const response = await fetch('https://blog-server-mu-taupe.vercel.app/register', {
        const response = await fetch('http://localhost:4000/register', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.status === 200) {
            alert('registration successful');
            navigate('/login')
        } else {
            alert('registration failed');
        }
    }
    return (

        <form className="register" onSubmit={register}>
            <h1>Register</h1>
            <input type="text"
                placeholder="Enter Your Name"
            />
            <input type="tel"
                placeholder="Mobile Number"
            />
            <input type="email"
                placeholder="user@gmail.com"
                value={username}
                onChange={ev => setUsername(ev.target.value)} />
            <input type="password"
                placeholder="password"
                value={password}
                onChange={ev => setPassword(ev.target.value)} />
            <button>Register</button>
            <div >Already a member? <Link className="atag" to={'/login'}>Login</Link></div>
        </form>

    );
}