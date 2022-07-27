//rfc *short to create react component*
import React from 'react'
import {useRef, useState, useEffect, useContext} from 'react'
import { Link } from "react-router-dom";
import AuthContext from '../context/AuthProvider';
import axios from "../api/axois";
import qs from 'qs';
const LOGIN_URL = "http://localhost:8080/api/login";

export default function Login() {
    const {setAuth} = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const form = {
        'username': user,
        'password': pwd
    }

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // fetch(LOGIN_URL, 
        //     {
        //         method: 'POST',
        //         mode: 'cors',
        //         credentials: 'omit',
        //         headers: {
        //             //'Content-Type': 'application/json'
        //             'Content-Type': 'application/x-www-form-urlencoded'
        //         },
        //         body: new URLSearchParams({
        //             'username': user,
        //             'password': pwd
        //         })
        //     })
        //     .then((response) => {
        //         console.log(response);
        //     });
        try {
            const response = await axios.post(LOGIN_URL,
                qs.stringify(form),
                {
                    //headers: {'Content-Type': 'application/json'}
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                });
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({user, pwd, roles, accessToken});
            setUser('');
            setPwd('');
            setSuccess(true);
        } catch (err) {
            if(!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    } 

  return (
    <>
        {success ? (
            <section>
                <h1>You are logged in!</h1>
                <br />
                <p>
                    <Link to="/">Go to Home</Link>
                </p>
            </section>
        ) : (
            <section>
                <p ref={errRef}>{errMsg}</p>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text" 
                        id="username" 
                        ref={userRef} 
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                    />
                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    />
                    <button>Sign in</button>
                </form>
                <p>
                    Need an Account?<br />
                    <span className="line">
                        <Link to="/register">Register</Link>
                    </span>
                </p>
            </section>
        )}
    </>
  )
}
