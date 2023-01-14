import axios from 'axios';
import React, { useState } from 'react'
import { useAuth } from '../Context/LoginContext';
import Navbar from './navbar';
import './Login.css'

// margin: auto;
//   width: 50%;
//   border: 3px solid green;
//   padding: 10px;

function Feedback() {
    const auth = useAuth();
    let email = auth.email;
    let user_id = -1;
    let [crop_id, setcrop_id] = useState();
    let [feedback, setfeedback] = useState('');
    let [disease_id, setdisease_id] = useState();

    axios.post('http://localhost:4000/getuserId', {
        email: email
    }).then(response => {
        user_id = response.data[0].user_id;
        console.log(user_id);
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:4000/feedback", {
            disease_id: disease_id,
            user_id: user_id,
            crop_id: crop_id,
            feedback: feedback
        }).then(response => {
            console.log(response.data);
            if (response.data === 'ok') {
                alert('Thank you for your valueable feedback')
            }
        })
    }

    const handelCropId = (e) => {
        setcrop_id(e.target.value)
    }

    const handelFeedback = (e) => {
        setfeedback(e.target.value)
    }

    const handelDiseaseId = (e) => {
        setdisease_id(e.target.value);
    }

    return (
        <div>
            <Navbar />
            <h3 style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "15vh 0"}}>Customer Feedback form  </h3>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "-10vh 0", minWidth:'600px'}}>
                <form onSubmit={handleSubmit} style={{ border: 'black', width: "18rem" }} className="card">
                    <input type="text" onChange={handelCropId} placeholder="Enter Crop id" required></input>
                    <br />
                    <input type="text" onChange={handelDiseaseId} placeholder="Enter Disease id" required></input>
                    <br />
                    <input type="text" onChange={handelFeedback} placeholder="what is your feedback" required></input><br />
                    
                    <button className="button" style={{ padding: "7px 100px", opacity: "0.9" }}  >Submit</button>
                    
                </form>
            </div>
        </div>
    )
}

export default Feedback;