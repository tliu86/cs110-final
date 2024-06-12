import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Profile = (props) => {
    let localUsername = localStorage.getItem("username"); 
    const [username, setUserName] = useState('');
    const [name, setName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [birthdate, setBirthDate] = useState()
    const [gender, setGender] = useState()
    const [age, setAge] = useState()
    const [bio, setBio] = useState('')


    const navigate = useNavigate();

    useEffect(() => {
        let url = `http://localhost:5555/user-data/${props.user}`
        fetch(url, {
            headers: { "x-access-token": localStorage.getItem('token') },
            method: 'get',
        })
        .then((response) => response.json())
          .then(data => {
            // console.log(data);
            setUserName(data.username)
            setUserEmail(data.email);
            setName(data.name)
            setBirthDate(data.birthDate)
            setGender(data.gender)
            setAge(data.age)
            setBio(data.bio)
          })
          .catch(error => {
            console.error("Error:", error);
          });
      }, [props.user]);
    
    const editProfile = () => {
      navigate('/newInfo')
    }

    return (  
        <div className="profile">
            <div className="header">
                <h2 className="user"> <b> {username} Profile: </b> </h2>
            </div>
            <br/>
            <div className="content">
                <p className="username"> <b> Username: </b> {username} </p>
                <p className="email"> <b> Email: </b> {userEmail} </p>
                <p className="name"> <b> Name: </b>{name} </p>
                <p className="gender"> <b> Gender: </b> {gender} </p>
                <p className="age"> <b> Age: </b> {age} </p>
                <p className="birthdate"> <b> Birthday: </b> <br/> {birthdate} </p>
                <p className="bio"> <b> Bio: </b> <br/> {bio} </p>
            </div>
            <br/> <br/>
            {localUsername == username && (<button className="bg-blue text-sky-900 px-3 ml-2 rounded hover:bg-gray-200" onClick={editProfile}> Edit Profile </button>)}
        </div>
    );
}
 
export default Profile ;