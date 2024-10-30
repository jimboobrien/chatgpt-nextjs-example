'use client';
// src/context/ActivePageContext.js
import React, { createContext, useContext, useState } from 'react';

const ActivePageContext = createContext();

export const useActivePage = () => useContext(ActivePageContext);

interface ActivePageProviderProps {
  children: React.ReactNode;
}

export const ActivePageProvider: React.FC<ActivePageProviderProps> = ({ children }) => {
  const [activePage, setActivePage] = useState('');

  const setActive = (page: string) => setActivePage(page);

  return (
    <ActivePageContext.Provider value={{ activePage, setActive }}>
      {children}
    </ActivePageContext.Provider>
  );
};
