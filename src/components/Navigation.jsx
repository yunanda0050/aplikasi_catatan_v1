//components/Navigation.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiHome, FiPlusCircle, FiLogOut } from "react-icons/fi";
import '../index.css';

function Navigation({ authUser, logout }) {
  const navigate = useNavigate(); // Hook from 'react-router-dom'
  const iconSize = 24;

  const handleLogout = () => {
    logout(); // Call the logout function passed as a prop
    navigate('/'); // Redirect to the login page
  };

  return (
    <nav className="navigation">
      <ul>
        {authUser && (
          <>
            <li>
              <Link to="/home">
                <FiHome size={iconSize} />
              </Link>
            </li>
            <li>
              <Link to="/add">
                <FiPlusCircle size={iconSize} />
              </Link>
            </li>
            <li>
              <Link to="/">
                <FiLogOut size={iconSize} onClick={handleLogout} />
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export { Navigation };