import { React, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from "../api/axois";
const SAVE_USER_URL = "http://localhost:8080/api/user/save";
const ASSIGN_USER_ROLE = "http://localhost:8080/api/role/giveUserRole"

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

  const saveUser = async(e) => {
    e.preventDefault();
    try {
      await axios.post(SAVE_USER_URL,
          {
            id: null,
            firstName: firstName,
            lastName: lastName,
            email: email,
            age: age,
            location: location,
            username: username,
            password: pwd,
            closets: [],
            roles: [],
            friendRequests: [],
            tradeOffers: [],
            alerts: [],
            friends: [],
            friendsOf: []
          },
          {
              headers: {
                'Content-Type': 'application/json'
              }
          });
      await axios.post(ASSIGN_USER_ROLE,
        {
          username: username,
          roleName: "ROLE_USER"
        },
        {
            headers: {
              'Content-Type': 'application/json'
            }
        });
      navigate("/login");
  } catch (err) {
      if(!err?.response) {
          setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
          setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
          setErrMsg('Unauthorized');
      } else if (err.response?.status === 403) {
          setErrMsg('User not found');
          console.log(errMsg)
      } else {
          setErrMsg('Login Failed');
      }
  }
  }

  return (
    <section>
      <form id="registerForm" onSubmit={saveUser}>
        <div id="loginFormTitle">
          <h1>Register</h1>
        </div>
        <div className='inputHolder'>
          <div className='formInput'>
            <label htmlFor='firstName'>First Name:</label>
            <input 
              type="text"
              id="firstName"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className='formInput'>
            <label htmlFor='lastName'>Last Name:</label>
            <input 
              type="text"
              id="lastName"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className='formInput'>
            <label htmlFor='email'>Email:</label>
            <input 
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='formInput'>
            <label htmlFor='age'>Age:</label>
            <input 
              type="number"
              id="age"
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          <div className='formInput'>
            <label htmlFor='zipcode'>Zipcode:</label>
            <input 
              type="text"
              id="zipcode"
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className='formInput'>
            <label htmlFor='username'>Username:</label>
            <input 
              type="text"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className='formInput'>
            <label htmlFor='pwd'>Password:</label>
            <input 
              type="text"
              id="pwd"
              onChange={(e) => setPwd(e.target.value)}
              required
            />
          </div>
        </div>
        <button className='submitButton center'>Register</button>
      </form>
    </section>
  )
}
