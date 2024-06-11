import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login');
  };

  return (
    <nav className="bg-sky-900 py-1 flex justify-end px-3 mb-4">
      <button 
        onClick={handleLogout} 
        className="bg-white text-sky-900 px-3  rounded hover:bg-gray-200"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
