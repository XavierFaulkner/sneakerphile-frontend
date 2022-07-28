import { React, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "../api/axois";
import useAuth from '../hooks/useAuth';
const SAVE_USER_URL = "http://localhost:8080/api/user/save";

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [pwd, setPwd] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();
  const {auth} = useAuth();

  const saveUser = async(e) => {
    e.preventDefault();
    console.log(auth.user);
    try {
      const response = await axios.post(SAVE_USER_URL,
          {
            id: null,
            firstName: firstName,
            lastName: lastName,
            email: email,
            age: age,
            location: location,
            username: username,
            password: pwd,
            roles: []
          },
          {
              headers: {
                'Content-Type': 'application/json'
              }
          });
      console.log(response);
      navigate("login");
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
  }
  }

  return (
    <>
      <p>{errMsg}</p>
      <form onSubmit={saveUser}>
        <label htmlFor='firstName'>First Name:</label>
        <input 
          type="text"
          id="firstName"
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <br />
        <label htmlFor='lastName'>Last Name:</label>
        <input 
          type="text"
          id="lastName"
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <br/>
        <label htmlFor='email'>Email:</label>
        <input 
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br/>
        <label htmlFor='age'>Age:</label>
        <input 
          type="number"
          id="age"
          onChange={(e) => setAge(e.target.value)}
          required
        />
        <br/>
        <label htmlFor='zipcode'>Zipcode:</label>
        <input 
          type="text"
          id="zipcode"
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <br/>
        <label htmlFor='username'>Username:</label>
        <input 
          type="text"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br/>
        <label htmlFor='pwd'>Password:</label>
        <input 
          type="text"
          id="pwd"
          onChange={(e) => setPwd(e.target.value)}
          required
        />
        <br/>
        <button>Register</button>
      </form>
    </>
  )
}
