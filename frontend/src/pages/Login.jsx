import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email,
      password
    };
  
    fetch('http://localhost:5555/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(responseData => {
        console.log("Login response data:", responseData);
        if (responseData === "Success") {
          enqueueSnackbar('You have logged in successfully', { variant: 'success' });
          navigate('/home');
        } else if (responseData === "The password is incorrect") {
          enqueueSnackbar('Error, Incorrect Password ', { variant: 'error' });
        } else if (responseData === "Email not registered") {
          enqueueSnackbar('Error, Incorrect Email', { variant: 'error' });
        } else {
          enqueueSnackbar('Unknown Error', { variant: 'error' });
        }
      })
      .catch(error => {
        console.error("Login failed:", error);
        enqueueSnackbar('Error, Login Failed ', { variant: 'error' });
      });
  }
  

  return (
    <div className='flex justify-center items-center min-h-screen bg-sky-200 flex-wrap'>
      <div className='bg-white p-7 rounded w-80'>
        <h2 className='text-2xl font-bold mb-4 text-center'>Login</h2>
        <form onSubmit={handleSubmit} action='post'>
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
          <button type="submit" className='w-full bg-sky-900 text-white py-2 px-4 rounded-md hover:bg-sky-500 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50'>Login</button>
        </form>
        <div className="text-center mt-4 flex flex-col items-center gap-2">
          <p>Already have an account?</p>
          <Link to="/register" className='border bg-white w-1/4 text-black w-full py-2 px-4 rounded-md hover:bg-sky-500 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50'>
            Register
          </Link>
        </div>
      </div>
    </div>
  );
  
  
  
};

export default Login;