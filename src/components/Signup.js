import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';

const Signup = () => {
  const context = useContext(noteContext);
  const {showAlert} = context;

    let navigate = useNavigate()
    const [credentials,setCredentials] = useState({name:"",email:"",password:""})
    const host = 'http://localhost:5000'
    const handleSubmit = async (e)=>{
        e.preventDefault()
            const response = await fetch(`${host}/api/auth/createuser`,{
              method:'POST',
              headers:{
                'Content-Type':'application/json',
              },
              body:JSON.stringify({
                name: credentials.name,
                email : credentials.email,
                password : credentials.password
            })
            })
            const json = await response.json()
            console.log(json)
            if(json.success){
                localStorage.setItem('token', json.authtoken)
                showAlert("Account Created Successfully","success")
                navigate("/login");
            }else{
                showAlert("Invalid Credentials","danger")
                
            }

    }


    const onChange = (e) => {
        setCredentials({...credentials,[e.target.name] : e.target.value})
      };
  return (
    <div>
        <form onSubmit={handleSubmit}>
    <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" onChange={onChange} value={credentials.name} id="name" name='name' aria-describedby="name" minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" onChange={onChange} id="email" name='email' value={credentials.email} aria-describedby="email" required />
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" onChange={onChange} id="password" value={credentials.password} name='password' minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" onChange={onChange} id="cpassword" name='cpassword' />
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>      
    </div>
  )
}

export default Signup
