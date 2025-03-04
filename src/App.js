import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import NoteState from './context/notes/NoteState'
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import { useState,useContext } from 'react';
import noteContext from './context/notes/noteContext';
function App() {


  const context = useContext(noteContext);
  const { alert, showAlert} = context;

  return (
    <>
    
      <Router>
        <Navbar/>
        <Alert alert={alert} msg={'i am alert'}/>
        <div className="container">
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/" element={<Home showAlert={showAlert} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        </div>
      </Router>
      
  
    </>
  );
}

export default App;
