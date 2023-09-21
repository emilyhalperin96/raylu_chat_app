import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import SignIn from './components/Signin.jsx'
import ChatWindow from './components/ChatWindow.jsx';
import './App.css';

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path ="/signin" element={<SignIn />}></Route>
        <Route path='/chatwindow' element={<ChatWindow />}></Route>
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
      
    </div>
  );
}

export default App;
