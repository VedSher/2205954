import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        
        <div className="flex space-x-10 text-xl">
          <NavLink 
            to="/feed" 
            className={({ isActive }) => 
              isActive 
                ? "font-bold gap-[1.2vw] px-[6vw] py-2 bg-white bg-opacity-20 rounded-lg transform scale-105 text-blue-300 transition-all duration-300" 
                : "px-4 gap-[1.2vw] py-2 hover:bg-white hover:bg-opacity-10 rounded-lg hover:text-blue-300 transition-all duration-300"
            }
          >
            Feed
          </NavLink>
          
          <NavLink 
            to="/top-users" 
            className={({ isActive }) => 
              isActive 
                ? "font-bold gap-[1.2vw] px-4 py-2 bg-white bg-opacity-20 rounded-lg transform scale-105 text-red-300 transition-all duration-300" 
                : "px-4 gap-[1.2vw] py-2 hover:bg-white hover:bg-opacity-10 rounded-lg hover:text-red-300 transition-all duration-300"
            }
          >
            Top Users
          </NavLink>
          
          <NavLink 
            to="/trending" 
            className={({ isActive }) => 
              isActive 
                ? "font-bold gap-[1.2vw] px-4 py-2 bg-white bg-opacity-20 rounded-lg transform scale-105 text-green-300 transition-all duration-300" 
                : "px-4 gap-[1.2vw] py-2 hover:bg-white hover:bg-opacity-10 rounded-lg hover:text-green-300 transition-all duration-300"
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
