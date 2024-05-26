import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

function Layout() {
  return (
    <div className='flex flex-col min-h-screen'>
      <div className="flex-grow">
        <NavBar />
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
