import axios from "axios";
import React, { useState } from "react";
import { useParams } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Navbar from "./navbar";

function Crop() {
    const param = useParams();
    const [diseasePesticide, setx] = useState([]);

    axios.post('http://localhost:4000/crop', {
        crop_id: param.crop
    }).then(response => {
        setx(response.data)
        if (response.data.length === 0) {
            alert('No data available')
        }
    })

    return (
        <div>
            <Navbar />
            <div style={{ display: "flex", justifyContent: "center", margin: "2vh 2wv", flexWrap: "wrap" }}>
                {
                    diseasePesticide.map((dp, i) => {
                        return (
                            <Paper elevation={20} sx={{ margin: "2vh 2vw", padding: "2vh 2vw" }} key={i}>
                                <table>
                                    <thead>
                                        <tr style={{ border: "1px solid black" }}>
                                            <th style={{ border: "1px solid black", padding: "2vh 2vw" }}>Disease Image</th>
                                            <th style={{ border: "1px solid black", padding: "2vh 2vw" }}>Disease Name</th>
                                            <th style={{ border: "1px solid black", padding: "2vh 2vw" }}>Pesticide Name</th>
                                            <th style={{ border: "1px solid black", padding: "2vh 2vw" }}>Quantity Per Acre(gram)</th>
                                            <th style={{ border: "1px solid black", padding: "2vh 2vw" }}>Disease Id</th>
                                            <th style={{ border: "1px solid black", padding: "2vh 2vw" }}>precautionary_measures</th>
                                        </tr>
                                    </thead>
                                    <tbody key={i}>
                                        <tr style={{ border: "1px solid black" }}>
                                            <td style={{ border: "1px solid black", padding: "2vh 2vw" }}><img src={dp.disease_image} alt="crop" style={{ maxWidth: '190px', maxHeight: '120px' }}></img></td>
                                            <td style={{ border: "1px solid black", padding: "2vh 2vw" }}>{dp.disease_name}</td>
                                            <td style={{ border: "1px solid black", padding: "2vh 2vw" }}>{dp.pesticide_name}</td>
                                            <td style={{ border: "1px solid black", padding: "2vh 2vw" }}>{dp.qtyPerAcre}</td>
                                            <td style={{ border: "1px solid black", padding: "2vh 2vw" }}>{dp.disease_id}</td>
                                            <td style={{ border: "1px solid black", padding: "2vh 2vw" }}>{dp.precautionary_measures}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </Paper>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Crop;