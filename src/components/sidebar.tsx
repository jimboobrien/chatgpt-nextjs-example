'use client';

import React, { useState } from 'react';
import Navbar from './navBar';
import Logo from './logo';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faChevronsLeft, faChevronsRight } from '@fortawesome/pro-solid-svg-icons';

interface SidebarProps {
  collapsed: boolean;
  toggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, toggleCollapse }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <aside className={` ${collapsed ? 'sidebar-collapsed' : ''}`}>
        <div className={`d-flex flex-column flex-shrink-0 p-3 h-100 text-white bg-dark sidebar ${collapsed ? 'sidebar-collapsed' : ''}`} >
          <div className="logo-container">
            <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
              {
                collapsed ?
                <div className="mb-2"><Logo /></div> :
                <span className="fs-4">ChatGPT Example</span>
              }
            </a>
          </div>
          <button
            onClick={toggleCollapse}
            className="navbar-toggler btn-collapse "
            type="button"
          >
            {
              collapsed ?
              <FontAwesomeIcon icon={faChevronsRight} /> :
              <FontAwesomeIcon icon={faChevronsLeft} />
            }
          </button>
          <hr />
          <Navbar collapsed={collapsed} />
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
      </aside>
    </>
  );
}

export default Sidebar;