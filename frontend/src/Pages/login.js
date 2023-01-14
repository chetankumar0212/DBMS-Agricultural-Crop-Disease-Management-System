import './Login.css'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useAuth } from '../Context/LoginContext';

function Login() {
  const [userCredentials, setUserCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate()
  const auth = useAuth();

  const onChange = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:4000/login',{
      email : userCredentials.email,
      password : userCredentials.password
    }).then(response=>{
      console.log(response.data);
      // if(response.data)
      if(response.data === 'no_user'){
        alert('No user found with email '+userCredentials.email)
      }if(response.data === 'ok'){
        auth.Loginemail(userCredentials.email);
        navigate('/home')
      }else{
        alert("bad credentials")
      }
    })
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "3vh 0" }}>
      <div className="login ,my-3" style={{ alignItems: "center" }}>
        <h1>Customer Login</h1>
        <br />
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Enter Email" onChange={onChange} required ></input>
          <br />
          <input type="text" name="password" onChange={onChange} placeholder="Enter Password" required></input><br />
          <br />
          <button className="button" style={{ padding: "7px 100px", opacity: "0.9" }}  >Login</button>
          <div>or</div>
        </form>
        <button className="button" style={{ padding: "7px 100px", opacity: "0.9" }} onClick={()=>{navigate('/signup')}} >Register</button>
      </div>
    </div>
  )
}

export default Login