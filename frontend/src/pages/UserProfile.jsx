import Profile from "../components/Profile.jsx"
import React from "react";
import Navbar from '../components/Navbar.jsx'

const UserProfile = () => {
    let user = window.localStorage.getItem("username"); 
    return (  
        <>
            <Navbar/>
            <Profile user={user}/>
        </>
    );
}
 
export default UserProfile;

// import {Link, useLocation, useNavigate} from 'react-router-dom'