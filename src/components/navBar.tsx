'use client';
// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { useActivePage } from '../context/ActivePageContext';

import Link from 'next/link';

const Navbar = () => {
    const { activePage, setActive } = useActivePage() as { activePage: string, setActive: (page: string) => void };
    //const [items, setItems] = useState([]);

    const navItems = [
        { "name": "Home", "path": "/" },
        { "name": "Text Prompt", "path": "/textPrompt" },
        { "name": "Image Prompt", "path": "/imagePrompt" },
        { "name": "DND Map", "path": "/dndPrompt" }
    ];

  // Load nav items from JSON
//   useEffect(() => {
//     setItems(navItems);
//   }, []);

  return (
    <ul className=" nav nav-pills flex-column mb-auto navbar-nav">
        {navItems.map((item) => (
            <li key={item.path} className="nav-item">
            <Link
                href={item.path}
                className={`nav-link ${activePage === item.name ? 'active' : ''}`}
                onClick={() => setActive(item.name)}
            >
                {item.name}
            </Link>
            </li>
        ))}
    </ul>
  );
};

export default Navbar;
