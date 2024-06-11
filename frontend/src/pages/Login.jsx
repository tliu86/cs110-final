import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack'
import OAuth from '../components/OAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loginStatus, setLoginStatus] = useState(false);

  const loggedIn = () => {
    setLoginStatus(true);
  }

  const loggedOut = () => {
    setLoginStatus(false);
  }

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
        console.log(response)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(responseData => {
        console.log("Login response data:", responseData);
        if (responseData.success === "Success") {
          enqueueSnackbar('You have logged in successfully', { variant: 'success' });
          loggedIn();
          localStorage.setItem("token", responseData.token);
          localStorage.setItem("userID", responseData.userID);
          localStorage.setItem("username", responseData.username);
          userAuthenticated();
          //navigate('/home');
        } else if (responseData.fail === "The password is incorrect") {
          enqueueSnackbar('Error, Incorrect Password ', { variant: 'error' });
          loggedOut();
        } else if (responseData.fail === "Email not registered") {
          enqueueSnackbar('Error, Incorrect Email', { variant: 'error' });
        } else {
          enqueueSnackbar('Unknown Error', { variant: 'error' });
          loggedOut();
        }
      })
      .catch(error => {
        console.error("Login failed:", error);
        enqueueSnackbar('Error, Login Failed ', { variant: 'error' });
        loggedOut();
      });
  }


  const userAuthenticated = () => {
    fetch("http://localhost:5555/api/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem('token')
      },
    }).then((response) => response.json())
      .then(data => {
        console.log(data);
        if (data.auth) {
          navigate('/home'); // Redirect to home if authenticated
        } else {
          enqueueSnackbar('Authentication failed', { variant: 'error' });
          loggedOut();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        enqueueSnackbar('Authentication failed', { variant: 'error' });
        loggedOut();
      });
  }

  /*const userAuthenticated = () => {
    fetch("http://localhost:5555/api/isUserAuth", {
     headers: {
      "x-access-token": localStorage.getItem('token')
     }, 
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.error("Error: ", error)
    })
  }*/
  

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

        <OAuth></OAuth>
        <div className="text-center mt-4 flex flex-col items-center gap-2">
          <p>Don't have an account?</p>
          <Link to="/" className='border bg-white w-1/4 text-black w-full py-2 px-4 rounded-md hover:bg-sky-500 focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50'>
            Register
          </Link>
          
        </div>
      </div>
    </div>
  );
  
  
  
};

export default Login;