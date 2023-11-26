import React from 'react'
import { Link, useLocation } from "react-router-dom";
import {useNavigate} from 'react-router-dom';
  

const Navbar = (props) => {
    const navigate = useNavigate();
    const logout=()=>{
        localStorage.removeItem('token');
        navigate('/login');
        props.showAlert("Logged Out Successfully","success")
    }
    let location = useLocation();
    return (
        <nav className={`navbar navbar-expand-lg   navbar-${props.mode} bg-${props.mode}  `}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">UrNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/"? "active": ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname==="/about"? "active": ""}`} to="/about">About</Link>
                        </li>
                        <div class="form-check form-switch container mx-2 my-2" >
  <input class="form-check-input" onClick={props.togglemode} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
  <label class={`form-check-label text-${props.mode==='light'?'dark':'light'} `} htmlFor="flexSwitchCheckChecked">Enable {props.mode==='light'?'Dark':'Light'} Mode</label>

</div>
                    </ul>
                    {!localStorage.getItem('token')?<form className="d-flex"> 
                    <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
                    <Link className="btn btn-primary mx-1" to="/signup" role="button">Signup</Link>
                    </form>: <button onClick={logout} type="submit" className="btn btn-primary">Logout</button>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar