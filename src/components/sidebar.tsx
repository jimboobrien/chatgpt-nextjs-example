'use client';

import React, { useState } from 'react';
import Navbar from './navBar';



function Sidebar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <div className="d-flex flex-column flex-shrink-0 p-3 h-100 text-white bg-dark" >
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <span className="fs-4">ChatGPT Examples</span>
        </a>
        <hr />
        <Navbar />
        <hr />
        <div className="dropdown dropup">
          <a
            href="#"
            className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
            id="dropdownUser1"
            onClick={toggleDropdown}
            aria-expanded={dropdownOpen}
          >
            { /* <img src="https://github.com/mdo.png" alt="" width="32" height="32" className="rounded-circle me-2" /> */ }
            <strong>jmo</strong>
          </a>
          <ul className={`dropdown-menu dropdown-menu-dark text-small shadow ${dropdownOpen ? 'show' : ''}`} aria-labelledby="dropdownUser1">
            <li><a className="dropdown-item" href="#">New project...</a></li>
            <li><a className="dropdown-item" href="#">Settings</a></li>
            <li><a className="dropdown-item" href="#">Profile</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Sign out</a></li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;