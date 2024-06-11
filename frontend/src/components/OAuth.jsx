import React from 'react'
import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth';
import {app} from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack'

const OAuth = () => {
    const auth = getAuth(app);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({prompt: "select_account"});
        try{
            const result = await signInWithPopup(auth, provider);
            
            const tok = await auth.currentUser.getIdToken();
            var userEmail = result.user.email;

            const data = {
              email: userEmail,
              oauth: true,
              oauthToken: tok
            };

            let resp = await fetch('http://localhost:5555/api/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            })
            let respData = await resp.json()
            console.log(respData)
            if (respData.auth) {
              enqueueSnackbar('You have logged in successfully', { variant: 'success' });
              localStorage.setItem("token", respData.token);
              localStorage.setItem("userID", respData.userID);
              localStorage.setItem("username", respData.username);
            } else {
              return enqueueSnackbar(`Login failed: ${respData.fail}`, { variant: 'error' });
            }

            const isAuthResp = await fetch("http://localhost:5555/api/isUserAuth", {
              headers: {
                "x-access-token": localStorage.getItem('token')
              },
            })

            const isAuthRespData = await isAuthResp.json()

            if (isAuthRespData.auth) {
              navigate('/home');
            } else {
              enqueueSnackbar('Authentication failed', { variant: 'error' });
            }
        }
        catch(error){
            console.log(error);
        }
      }


  return (
    <button className="w-full bg-white border-black border mt-2 text-black py-2 px-4 rounded-md hover:bg-sky-500 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50" 
            onClick = {handleGoogleClick}>Sign in with Google</button>
  )
}


export default OAuth;