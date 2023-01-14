import React, {  useEffect, useState } from 'react'
import { useAuth } from '../Context/LoginContext';
import axios from 'axios'
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';

function Home() {
    // eslint-disable-next-line
    let [user_name, sestusername] = useState('');
    let [crops, setcrops] = useState([]);
    const navigate = useNavigate();

    function fetchdata() {
        let email = auth.email;
        axios.post('http://localhost:4000/getuserdetails', {
            email: email
        }).then(response => {
            sestusername(response.data[0].user_name);
        })
        axios.get('http://localhost:4000/crops').then(response => {
            setcrops(response.data);
        })
    }

    const auth = useAuth();

    useEffect(() => {
        fetchdata();
        // eslint-disable-next-line
    },[]);

    return (
        <div>
            <Navbar />
            <br />
            <h2 style={{textAlign : 'center', backgroundColor : "grey",color : 'white', maxWidth : '400px', marginLeft : "500px"}}>List of Crops</h2>
            <div style={{ display: "flex", justifyContent: "center", margin: "2vh 2wv", flexWrap: "wrap" }}>
                {
                    crops.map(((crop, i) => {
                        function handleClick (crop_id){
                            navigate('/home/'+crop_id);
                        }
                        return (
                            <Paper elevation = {20} sx = {{margin : "2vh 2vw",padding:"2vh 2vw"}} key={i}>
                                <table>
                                    <thead>
                                        <tr style={{ border: "1px solid black" }}>
                                            <th style={{border: "1px solid black",padding:"2vh 2vw"}}>Crop name</th>
                                            <th style={{border: "1px solid black",padding:"2vh 2vw"}}>Crop image</th>
                                            <th style={{border: "1px solid black",padding:"2vh 2vw"}}>Crop ID</th>
                                        </tr>
                                    </thead>
                                    <tbody key={i}>
                                        <tr style={{ border: "1px solid black" }}>
                                            <td style={{border: "1px solid black",padding:"2vh 2vw"}}>{crop.crop_name}</td>
                                            <td style={{border: "1px solid black",padding:"2vh 2vw"}}><img src={crop.crop_image} alt="crop" style={{maxWidth : '190px',maxHeight:'120px'}} onClick={()=>{
                                                console.log(crop.crop_id);
                                                handleClick(crop.crop_id);
                                            }}></img></td>
                                            <td style={{border: "1px solid black",padding:"2vh 2vw"}}>{crop.crop_id}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Paper>
                        )
                    }))
                }
            </div>
        </div>
    )
}

export default Home;