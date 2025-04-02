import React, { useState } from 'react';
import { getRandomImage } from '../utils/imageUtils';

const PostCard = ({ post, trending = false }) => {
  const [profileImageError, setProfileImageError] = useState(false);
  const [postImageError, setPostImageError] = useState(false);
  
  const fallbackProfileImage = "https://via.placeholder.com/50?text=User";
  const fallbackPostImage = "https://via.placeholder.com/400x300?text=Post+Image";
  
  return (
    <div className={`flex flex-col border-4 border-white rounded-xl shadow-xl overflow-hidden mb-8 
      max-w-2xl mx-auto bg-gray-50 ${trending ? 'ring-2 ring-yellow-400' : ''}`}
    >
      <div className="flex items-center p-4 bg-white border-b border-gray-100">
        <div className="relative flex-shrink-0">
          <img 
            src={profileImageError ? fallbackProfileImage : getRandomImage('user', post.userId)} 
            alt="User"
            className="w-14 h-14 rounded-full border-2 border-gray-200 mr-3 object-cover shadow"
            onError={() => setProfileImageError(true)}
          />
          {trending && (
            <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1 shadow-md">
              <span className="text-xs">🔥</span>
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-lg text-gray-900 truncate">{post.userName || `User ${post.userId}`}</h3>
          <p className="text-sm text-gray-500">{new Date(post.timestamp).toLocaleString()}</p>
        </div>
      </div>
      
      <div className="w-full">
        <img 
          src={postImageError ? fallbackPostImage : getRandomImage('post', post.id)}
          alt="Post content" 
          className="w-full h-96 object-cover"
          onError={() => setPostImageError(true)}
        />
      </div>
      
      <div className="flex flex-col flex-1 p-4 bg-white">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h2>
        <p className="text-lg text-gray-700 mb-4 flex-1">{post.body}</p>
        
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-50 bg-blue-50 hover:bg-blue-100 text-blue-800 font-medium px-3 py-1 rounded-full text-sm border border-blue-200">
              💬 {post.commentCount || 0}
            </button>
            
            <button className="flex items-center gap-1 bg-red-50 hover:bg-red-100 text-red-800 font-medium px-3 py-1 rounded-full text-sm border border-red-200">
              ❤️
            </button>
          </div>
          
          {trending && (
            <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full border border-yellow-300 flex items-center gap-1">
              🔥 Trending
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;