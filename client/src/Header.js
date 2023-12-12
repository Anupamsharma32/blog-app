import {Link} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {UserContext, UserContextProvider} from "./UserContext";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const {setUserInfo,userInfo} = useContext(UserContext);
  const navigate=useNavigate()
  useEffect(() => {
    // fetch('https://blog-server-mu-taupe.vercel.app/profile', {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  // function logout() {
  //   const response=fetch('http://localhost:4000/logout', {
  //     credentials: 'include',
  //     method: 'POST',
  //   });
  //   setUserInfo(null);
  //   if(response.status===200){
  //     alert("you are logged out")
  //   }
  // }
  const logout = async () => {
    try {
      const response = await fetch('http://localhost:4000/logout', {
        credentials: 'include',
        method: 'POST',
      });

      setUserInfo(null);

      if (response.status === 200) {
        alert("You are logged out");
        navigate('/login')
      } else {
        console.error('Logout failed. Status:', response.status);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };


  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">MyBlogs</Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create New Post</Link>
            <a onClick={logout}>LogOut</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}