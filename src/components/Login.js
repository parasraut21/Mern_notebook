import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';
import Footer from './Footer';

const BASE_URL = "http://localhost:5000"

function Login(props) {

    const {togglemode,mode}= props;
    const [credentials, setCredentials] = useState({email: "", password: ""}) 
    const navigate = useNavigate();

  
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json()
        if (json.success){
            // Save the auth token and redirect
            localStorage.setItem('token', json.token); 
            props.showAlert("Account Logged in successfully","success");
            navigate('/');
           
        }
        else{
            props.showAlert("User Not Found (Please Sign Up First)","danger");
          
           setTimeout(() => {
            props.showAlert("Redirected To Sign Up Page","success");
              }, 4000);
            navigate('/signup');
          
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
    <div className='container mt-3'>
        <h2 style={mystyleh1}>Log in To Continue UrNoteBook</h2>
    <form  onSubmit={handleSubmit} className="my-5">
                <div className="mb-3" style={mystyleh1}>
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3" style={mystyleh1}>
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" required />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
         </div>
         <div>
         <Footer title="Designed by Paras Raut" mode={mode} togglemode={togglemode} fixed={""}/>
         </div>
         
    </>
  )
}



// const Login = (props) => {
//     const [credentials, setCredentials] = useState({email: "", password: ""}) 
//     let history = useHistory();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const response = await fetch("http://localhost:5000/api/auth/login", {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({email: credentials.email, password: credentials.password})
//         });
//         const json = await response.json()
//         console.log(json);
//         if (json.success){
//             // Save the auth token and redirect
//             localStorage.setItem('token', json.authtoken); 
//             history.push("/");

//         }
//         else{
//             alert("Invalid credentials");
//         }
//     }

//     const onChange = (e)=>{
//         setCredentials({...credentials, [e.target.name]: e.target.value})
//     }

//     return (
//         <div>
//             <form  onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                     <label htmlFor="email" className="form-label">Email address</label>
//                     <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
//                     <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
//                 </div>
//                 <div className="mb-3">
//                     <label htmlFor="password" className="form-label">Password</label>
//                     <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
//                 </div>

//                 <button type="submit" className="btn btn-primary">Submit</button>
//             </form>
//         </div>
//     )
// }

export default Login