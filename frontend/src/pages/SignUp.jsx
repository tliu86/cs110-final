import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack'
import {GoogleAuthProvider, signInWithPopup, getAuth} from 'firebase/auth';
import {app} from '../firebase';

const SignUp = () => {
  const auth = getAuth(app);
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      username,
      email,
      password
    };

    fetch('http://localhost:5555/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        return response.json();
      })
      .then(responseData => {
        if (!responseData.name) {
          if (responseData.message) {
            return enqueueSnackbar(`Error: ${responseData.message}`, {variant: 'Error'});
          }
          throw new Error('Network response was not ok');
        }
        enqueueSnackbar('You have Registered Successfully', {variant: 'success'});
        navigate('/login')
      })
      // .catch(error => {
      //   enqueueSnackbar('Error, Registration Failed', {variant: 'Error'});
      // });
  }

  const handleGoogleClick = async () => {

    if (!name || !username) {
      return enqueueSnackbar('Error: Fill out Name and Username fields.', {variant: 'Error'});
    }

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({prompt: "select_account"});
    try{
        const result = await signInWithPopup(auth, provider);
        
        const tok = await auth.currentUser.getIdToken();
        
        var userEmail = result.user.email;

        const data = {
          name,
          username,
          email: userEmail,
          oauth: true,
          oauthToken: tok
        };

        let resp = await fetch('http://localhost:5555/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        let respData = await resp.json()

        if (!resp.ok) {
          return enqueueSnackbar(`Error: ${respData.message || 'Google Registration Failed'}`, {variant: 'Error'});
        }

        enqueueSnackbar('You have Registered Successfully', {variant: 'success'});
        navigate('/login')
    }
    catch(error){
        console.log(error);
    }
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-sky-200 flex-wrap'>
      <div className='bg-white p-7 rounded w-80'>
        <h2 className='text-2xl font-bold mb-4 text-center'>Register</h2>
        <form onSubmit={handleSubmit} action='post'>
          <div className='mb-4'>
            <label htmlFor='name' className='block mb-1'>
              Name
            </label>
            <input 
              type='text' 
              placeholder='Enter Name' 
              autoComplete="off" 
              name="name" 
              className='w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-500' 
              onChange={(e) => setName(e.target.value)} 
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='name' className='block mb-1'>
              Username
            </label>
            <input 
              type='text' 
              placeholder='Enter Username' 
              autoComplete="off" 
              name="name" 
              className='w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-500' 
              onChange={(e) => setUserName(e.target.value)} 
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='email' className='block mb-1'>
              Email
            </label>
            <input 
              type='email' 
              placeholder='Enter Email' 
              autoComplete="off" 
              name="email" 
              className='w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-500' 
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='password' className='block mb-1'>
              Password
            </label>
            <input 
              type='password' 
              placeholder='Enter Password' 
              autoComplete="off" 
              name="password" 
              className='w-full px-3 py-2 border rounded focus:outline-none focus:border-indigo-500' 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>
          <button type="submit" className='w-full bg-sky-900 text-white py-2 px-4 rounded-md hover:bg-sky-500 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50'>Register</button>
        </form>
        <button type="submit" onClick = {handleGoogleClick} className='w-full bg-white border mt-2 text-black py-2 px-4 rounded-md hover:bg-sky-500 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50'>Register With Google</button>
        <div className="text-center mt-4 flex flex-col items-center gap-2">
          <p>Already have an account?</p>
          <Link to="/login" className='border bg-white w-1/4 text-black w-full py-2 px-4 rounded-md hover:bg-sky-500 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50'>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
  
  
  
};

export default SignUp;
