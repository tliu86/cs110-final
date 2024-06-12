import Profile from "../components/Profile.jsx"
import React from "react";
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'

const UserProfile = () => {
    const {username} = useParams();
    
    let user = username || window.localStorage.getItem("username");

    return (  
        <>
            <Navbar/>
            <Profile user={user}/>
        </>
    );
}
 
export default UserProfile;

// import {Link, useLocation, useNavigate} from 'react-router-dom'