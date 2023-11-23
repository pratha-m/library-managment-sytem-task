import React from 'react'
import { Link } from 'react-router-dom'
import "./header.css";

const Header = () => {
  return (
    <div>
      <input type="checkbox" id="expand-toggler" />
      <header className="header">
        <div className="logoContainer">
          <Link to="/">DIVERSE READS</Link>
          <label htmlFor="expand-toggler" id="expand-btn">
            <img src="/images/hamburgericon-black.png" id="hambergerIcon" alt="" />
            <img src="/images/crossicon-black.png" id="crossIcon" alt="" />
          </label>
        </div>
        <nav>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/library">Library</Link></li>
          </ul>
        </nav>
      </header>
    </div>
  )
}

export default Header