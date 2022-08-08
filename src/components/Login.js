//rfc *short to create react component*
import React from 'react'
import {useRef, useState, useEffect} from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import axios from "../api/axois";
import qs from 'qs';
const LOGIN_URL = "http://localhost:8080/api/login";

export default function Login() {
    const {setAuth} = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

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
            const accessToken = response?.data?.access_token;
            const roles = response?.data?.roles;
            setAuth({user, pwd, roles, accessToken});
            setUser('');
            setPwd('');
            navigate(from, {replace: true});
        } catch (err) {
            if(!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else if (err.response?.status === 403) {
                setErrMsg('User not found');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    } 

    return (
        <section>
            <p ref={errRef}>{errMsg}</p>
            <form id="loginForm" onSubmit={handleSubmit}>
                <div id="loginFormTitle">
                    <h1>Login</h1>
                </div>
                <div className='inputHolder'>
                    <div className="formInput">
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
                    </div>
                    <div className="formInput">
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password" 
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                    </div>
                </div>
                <button className='submitButton center'>Sign in</button>
                <p className='center'>
                Need an Account?
                <span className="line">
                    <Link to="/register">Register</Link>
                </span>
            </p>
            </form>
        </section>
    )
}
