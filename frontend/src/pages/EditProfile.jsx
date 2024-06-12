import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import Navbar from '../components/Navbar'

const EditProfile = () => {
    let user = window.localStorage.getItem("username"); 
    const [firstAge, setFirstAge] = useState();
    const [firstGender, setFirstGender] = useState('');
    const [firstBio, setFirstBio] = useState('');
    const [firstBirthDate, setFirstBirthDate] = useState();

    const navigate = useNavigate()

    async function firstSubmit(e) {
        e.preventDefault()

        const data = {
            user: user, 
            age: firstAge,
            birthDate: firstBirthDate,
            gender: firstGender,
            bio: firstBio
          };
        
          fetch('http://localhost:5555/newInfo', {
            method: 'POST',
            headers: {
               "x-access-token": localStorage.getItem('token'),
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
            .then(response => {
            //   console.log(response)
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .then(responseData => {
              if(responseData.message === "good") {
                navigate('/profile')
              }
            })
            .catch(error => {
              console.error("Failed:", error);
            });
    }

        return (
            <div className="editProfile">
                <Navbar/> 
                {/* Please include some additional information: */}
                <div className="formContainer">
                    <form className="chooseForm" onSubmit={firstSubmit}>
                        <div className="formItem">
                            <label for="age"> Age: </label>
                            <input type="number" id="age" name="age" min="1" max="100" value={firstAge} 
                            onChange={(e) => setFirstAge(e.target.value)} placeholder="Enter age 1-100" required/>
                        </div>
                        <div className="formItem">
                            <label for="birthDate"> Birthday (only numbers, no spaces, if single digit write 0 before): </label>
                            <input type="number" id="birthDate" name="birthDate" min="01010000" max="12319999"value={firstBirthDate} 
                            onChange={(e) => setFirstBirthDate(e.target.value)} placeholder="Enter Birthdate" required/>
                        </div>
                        <div className="formItem">
                            <label for="gender"> Gender:</label>
                            <select id="gender" name="gender" value={firstGender} onChange={(e) => setFirstGender(e.target.value)} required>
                                <option value="">Select gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                                <option value="Prefer not to say">Prefer not to say</option>
                            </select>
                        </div>
                        <div className="formItem">
                            <label for="bio"> Short Bio: </label>
                            <textarea id="bio" name="bio" rows="5" value={firstBio} onChange={(e) => setFirstBio(e.target.value)}required/>
                        </div>
                        <div className="formItem">
                            <button> Submit </button> 
                        </div>
                    </form>
                </div>
            </div>
        );
}
 
export default EditProfile;