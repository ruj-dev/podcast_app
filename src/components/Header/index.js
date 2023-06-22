import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './style.css'
function Header() {
  const location = useLocation();
  const currentLocation = location.pathname;
  return (
    <div className="nav">
      <div className="gradient"></div>
      <div className="links">
        <Link to="/SignInSignup" className={currentLocation=="/"?"active":""}>Signup </Link>
        <Link to="/Podcasts">Podcasts</Link>
        <Link to="/Start-a-podcast">Start a podcast</Link>
        <Link to="/Profile">Profile</Link>
      </div>
    </div>
  );
}

export default Header