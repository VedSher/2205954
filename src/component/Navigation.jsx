import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Social Analytics</div>
        <div className="flex space-x-4">
          <NavLink 
            to="/feed" 
            className={({ isActive }) => 
              isActive ? "font-bold underline" : "hover:underline"
            }
          >
            Feed
          </NavLink>
          <NavLink 
            to="/top-users" 
            className={({ isActive }) => 
              isActive ? "font-bold underline" : "hover:underline"
            }
          >
            Top Users
          </NavLink>
          <NavLink 
            to="/trending" 
            className={({ isActive }) => 
              isActive ? "font-bold underline" : "hover:underline"
            }
          >
            Trending Posts
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;