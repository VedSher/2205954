import React, { useState } from 'react';
import { getRandomImage } from '../utils/imageUtils';

const UserCard = ({ user }) => {
  const [imageError, setImageError] = useState(false);
  const fallbackImage = "https://via.placeholder.com/150?text=User";
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-1">
        <div className="bg-white p-4 rounded-t-lg flex items-center space-x-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full animate-pulse"></div>
            <img 
              src={imageError ? fallbackImage : getRandomImage('user', user.id)} 
              alt={user.name}
              className="w-16 h-16 rounded-full relative z-10 object-cover border-2 border-white"
              onError={() => setImageError(true)}
            />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-800">{user.name}</h3>
            <p className="text-sm text-gray-500">@{user.username}</p>
          </div>
        </div>
      </div>
      <div className="p-4 bg-gradient-to-b from-white to-gray-50">
        <div className="flex justify-between items-center">
          <div className="text-sm font-medium text-gray-500">Posts Count</div>
          <div className="text-xl font-bold text-indigo-600">{user.postCount}</div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;