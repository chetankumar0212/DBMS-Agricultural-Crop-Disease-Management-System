import React from 'react'
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { useAuth } from '../Context/LoginContext';

function Navbar() {
    const navigate = useNavigate();
    const auth = useAuth();

    const handleLogout = (e) => {
        console.log("handle log out is called");
        auth.Loginemail(null)
        navigate('/login')
    }

    const handleFeedback = () => {
        navigate('/feedback')
    }

    const handleClickhome = () => {
        navigate('/home')
    }

    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark ">
            <a className="navbar-brand , mx-3" onClick={handleClickhome}><span style={{ fontFamily: "revert-layer" }}><HomeIcon /></span></a>
            <a className="navbar-brand , mx-1000"  style={{marginLeft : '540px'}}><span style={{ fontFamily: "revert-layer" }}>Crop Disease Management</span></a>
            <div className="collapse navbar-collapse , container d-flex justify-content-end" id="navbarNav">
                <ul className="navbar-nav">
                    <div className='container d-flex justify-content-between'>
                        <button type="button" className="btn btn-secondary , mx-4 ,container d-flex justify-content-between  " style={{ opacity: "0.9 " }} onClick={handleFeedback}>Have a feedback? Let us know!!</button>
                    </div>
                    <div className='container d-flex justify-content-between'>
                        <button type="button" className="btn btn-secondary , mx-3 ,container d-flex justify-content-between  " style={{ opacity: "0.9 " }} onClick={handleLogout}>Logout</button>
                    </div>
                </ul>

            </div>
        </nav>
    )
}

export default Navbar
