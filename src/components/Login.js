import React, { useState,useEffect,useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';

const Login = () => {
  const context = useContext(noteContext);
  const {showAlert} = context;
    const [credentials, setCredentials] = useState({email:"",password:""})
    useEffect(() => {
      localStorage.removeItem("token"); 
      
    }, []);
    let navigate = useNavigate()

    const onChange = (e) => {
        setCredentials({...credentials,[e.target.name] : e.target.value})
      };
    const host = 'http://localhost:5000'
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await fetch(`${host}/api/auth/login`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                  email: credentials.email,
                  password: credentials.password
              })
          });
  
          const json = await response.json();
          console.log("Full API Response:", json); // Debug API response
  
          if (json.success) {
              console.log("Received Token:", json.authToken); // Fix key name
  
              localStorage.setItem('token', json.authToken);
              console.log("Stored Token:", localStorage.getItem('token')); // Verify storage
  
              showAlert("Logged In Successfully", "success");
              setTimeout(() => navigate("/"), 500); // Ensure navigation happens after storage
          } else {
              showAlert("Invalid Credentials", "danger");
          }
      } catch (error) {
          console.error("Login Error:", error);
      }
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name='email' value={credentials.email} onChange={onChange} aria-describedby="email" />
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name='password' />
  </div>
  <button type="submit" className="btn btn-primary" onSubmit={handleSubmit}>Submit</button>
  </form>
    </div>
  )
}

export default Login
