import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { Link } from "react-router-dom";
export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { setUserInfo } = useContext(UserContext);
    async function login(ev) {
        ev.preventDefault();
        // const response = await fetch('https://blog-server-mu-taupe.vercel.app/login', {
        const response = await fetch('http://localhost:4000/login', {

            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
           
            credentials: 'include',
        });
        

        if (response.ok) {
            response.json().then(userInfo => {
                setUserInfo(userInfo);
                setRedirect(true);
            });
        } else if (response.status === 401) {
            alert('Incorrect username or password!');
        } else {
            alert('An error occurred during login.');
        }

    }

    if (redirect) {
        alert("you are logged in")
        return <Navigate to={'/'} />
    }
    return (

        <form className="login" onSubmit={login}>
            <h1>Login</h1>
            <input type="email"
                placeholder="username"
                value={username}
                onChange={ev => setUsername(ev.target.value)} />
            <input type="password"
                placeholder="password"
                value={password}
                onChange={ev => setPassword(ev.target.value)} />
            <button>Login</button>
            <div >Not Registered ? <Link className="atag" to={'/register'}>Register Now</Link></div>

        </form>

    );
}