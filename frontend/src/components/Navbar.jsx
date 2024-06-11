import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    localStorage.removeItem("username");
    localStorage.removeItem("userID");
    navigate('/login');
  };

  return (
    username && <nav className="bg-sky-900 py-1 flex justify-end px-3 mb-4">
      <div>
        Logged in as {username} 
      </div>
      <button 
        onClick={handleLogout} 
        className="bg-white text-sky-900 px-3 ml-2 rounded hover:bg-gray-200"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
