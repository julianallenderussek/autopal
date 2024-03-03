import React, { useContext } from "react";
import "./Header.css"
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { useNavigate } from 'react-router-dom';

const Header = () => {
  
  const { token, setToken, role, setRole } = useContext(AppContext)
  
  const navigate = useNavigate()

  const disconnect = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    setToken(null)
    setRole(null)
    navigate('/')
  }

  return (
    <header className="header">
      <div className="logo_holder">
        <h1>Logo</h1>
      </div>
      <div className="links_container">
        <Link to="/" className="link">Home</Link>
        {
          role === "seller" ? (
              <>
                <Link to="/create_listing" className="link">Create Listing</Link>
                <Link to="/my_auto_listings" className="link">My Listings</Link>
                <Link to="/auto_listings" className="link">All Listings</Link>
                <Link to="/sellers_appointments" className="link">Appointments</Link>
              </>
              ) : <></>
        }

        {
          role === "buyer" ? (
              <>
                <Link to="/auto_listings" className="link">All Listings</Link>
                <Link to="/sellers_appointments" className="link">Appointments</Link>
              </>
              ) : <></>
        }

        {
          token ? 
            <button onClick={disconnect}>Signout</button> :
            <Link to="/login" className="link">Login</Link>
        }
        
      </div>
    </header>
  );
};

export default Header;
