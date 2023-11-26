import React, {useState} from 'react'
//import { useHistory } from 'react-router-dom'

import {useNavigate} from 'react-router-dom';
import Footer from './Footer';
const Signup = (props) => {
    const {togglemode,mode} =props;
    const [credentials, setCredentials] = useState({name:"",email: "", password: "",cpassword:""}) 
    const navigate = useNavigate();
    const BASE_URL = "http://localhost:5000"
    const handleSubmit = async (e) => {
        const {name,email,password} = credentials;
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email, password})
        });
        const json = await response.json()
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.token); 
            props.showAlert("Account Logged in successfully","success");
           // navigate('/');
           navigate('/');
        }
        else{
            props.showAlert("User With This Email Already Exits","danger");
          
           // props.showAlert("Invalid Credentials","danger");
           navigate('/login');
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    let mystyleh1 ={
        color:props.mode ==='dark'?'white':'#042743',
       }

  
 
    return (
        <>
         
        <div className='container '>
        <h2 style={mystyleh1}>Sign Up Page Of UrNoteBook</h2>
        <form onSubmit={handleSubmit} className="my-1 my-2" >
        <div className="mb-2 my-3" style={mystyleh1}>
                    <label htmlFor="name" className="form-label">Name</label>
                    <input onChange={onChange} type="test" className="form-control"  id="name" name="name" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3" style={mystyleh1}>
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input onChange={onChange} type="email" className="form-control"  id="email" name="email" aria-describedby="emailHelp" />
                    <div style={mystyleh1} id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3" style={mystyleh1}>
                    <label htmlFor="password" className="form-label">Password</label>
                    <input onChange={onChange} type="password" className="form-control"  name="password" id="password" required/>
                </div>
                <div className="mb-3" style={mystyleh1}>
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input onChange={onChange} type="password" className="form-control"  name="cpassword" id="cpassword" required />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
         <Footer title="Designed by Paras Raut" mode={mode} togglemode={togglemode} fixed={""}/>
         </>
    )
}

export default Signup