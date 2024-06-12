import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); 
    } else {
      fetch("http://localhost:5555/api/isUserAuth", {
        headers: {
          "x-access-token": token
        },
      })
      .then(response => response.json())
      .then(data => {
        if (!data.auth) {
          navigate('/login');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        navigate('/login');
      });
    }
  }, [navigate]);

  return children;
};

export default ProtectedRoute;