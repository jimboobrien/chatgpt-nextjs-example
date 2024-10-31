'use client';
// src/context/ActivePageContext.js
import React, { createContext, useContext, useState, ReactNode } from 'react';


// Define the shape of the context
interface ActivePageContextProps {
  activePage: string;
  setActive: (page: string) => void;
}

// Provide a default value
const ActivePageContext = createContext<ActivePageContextProps | undefined>(undefined);


export const ActivePageProvider = ({ children }: { children: ReactNode }) => {
  const [activePage, setActivePage] = useState('Home');

  const setActive = (page: string) => {
    setActivePage(page);
  };

  return (
    <ActivePageContext.Provider value={{ activePage, setActive }}>
      {children}
    </ActivePageContext.Provider>
  );
};

// Custom hook to use the ActivePageContext
export const useActivePage = () => {
  const context = useContext(ActivePageContext);
  if (context === undefined) {
    throw new Error('useActivePage must be used within an ActivePageProvider');
  }
  return context;
};