import {
  BrowserRouter,
  Routes,
  Route
  } from 'react-router-dom';
  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import './index.css';
  import Login from './Pages/login';
  import Home from './Pages/home';
  import SignUp from './Pages/signup';
  import { Restrict } from './Context/Restrict';
  import { AuthProvider } from './Context/LoginContext';
  import Crop from './Pages/crop';
  import Intro from './Pages/intro';
  import Feedback from './Pages/feedback';
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <div>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Intro />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<SignUp />}></Route>
            <Route path='/home' element={<Restrict><Home /></Restrict>}></Route>
            <Route path='home/:crop' element={<Restrict><Crop /></Restrict>}></Route>
            <Route path='/feedback' element={<Restrict><Feedback /></Restrict>}></Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
  