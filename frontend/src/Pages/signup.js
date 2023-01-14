import './Login.css'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function SignUp() {
  const [userCredentials, setUserCredentials] = useState({ name : "",email: "", password: "" });
  const navigate = useNavigate()

  const onChange = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(userCredentials);
    axios.post('http://localhost:4000/Signup',{
      name : userCredentials.name,
      email : userCredentials.email,
      password : userCredentials.password
    }).then(response=>{
      if(response.data === 'already_customer'){
        alert('Email '+userCredentials.email+' is already registered');
      }else{
        alert('Email '+userCredentials.email+ ' registered!!')
        navigate('/login');
      }
    })
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "3vh 0" }}>
      <div className="login ,my-3" style={{ alignItems: "center" }}>
        <h1>Customer Signup</h1>
        <br />
        <form onSubmit={handleSubmit}>
          <input type="text" name='name' placeholder='Enter your name' onChange={onChange} required></input>
          <br />
          <input type="email" name="email" placeholder="Enter Email" onChange={onChange} required ></input>
          <br />
          <input type="text" name="password" onChange={onChange} placeholder="Enter Password" required></input><br />
          <br />
          <button className="button" style={{ padding: "7px 100px", opacity: "0.9" }}  >Signup</button>
        </form>
      </div>
    </div>
  )
}

export default SignUp