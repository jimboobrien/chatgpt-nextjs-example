'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/sidebar';

interface LayoutContainerProps {
  children: React.ReactNode;
}

const LayoutContainer: React.FC<LayoutContainerProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`layout-container ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <Sidebar collapsed={collapsed} toggleCollapse={toggleCollapse} />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default LayoutContainer;