'use client';
// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { useActivePage } from '../context/ActivePageContext';

import Link from 'next/link';

const Navbar = () => {
    const { activePage, setActive } = useActivePage() as { activePage: string, setActive: (page: string) => void };
    //const [items, setItems] = useState([]);

    const navItems = [
        { "name": "Home", "path": "/", "icon": "fa-solid fa-house" },
        { "name": "Text Prompt", "path": "/textPrompt", "icon": "fa-regular fa-comment" },
        { "name": "Image Prompt", "path": "/imagePrompt", "icon": "fa-solid fa-image" },
        { "name": "DND Map", "path": "/dndPrompt", "icon": "fa-solid fa-map-location-dot" }
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
                className={`nav-link ${activePage === item.name ? 'active' : ''} ${item.icon} `}
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
