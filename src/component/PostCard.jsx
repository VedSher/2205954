import React, { useState } from 'react';
import { getRandomImage } from '../utils/imageUtils';

const PostCard = ({ post, trending = false }) => {
  const [profileImageError, setProfileImageError] = useState(false);
  const [postImageError, setPostImageError] = useState(false);
  
  const fallbackProfileImage = "https://via.placeholder.com/50?text=User";
  const fallbackPostImage = "https://via.placeholder.com/400x300?text=Post+Image";
  
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden mb-4 
      ${trending ? 'border-2 border-yellow-400' : ''}`}>
      <div className="p-4">
        <div className="flex items-center mb-3">
          <img 
            src={profileImageError ? fallbackProfileImage : getRandomImage('user', post.userId)} 
            alt="User"
            className="w-10 h-10 rounded-full mr-3 object-cover"
            onError={() => setProfileImageError(true)}
          />
          <div>
            <h3 className="font-medium">{post.userName || `User ${post.userId}`}</h3>
            <p className="text-xs text-gray-500">
              {new Date(post.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
        <h2 className="text-xl font-bold mb-2">{post.title}</h2>
        <p className="text-gray-700 mb-3">{post.body}</p>
        <img 
          src={postImageError ? fallbackPostImage : getRandomImage('post', post.id)}
          alt="Post content" 
          className="w-full h-48 object-cover rounded-md"
          onError={() => setPostImageError(true)}
        />
        <div className="mt-3 flex items-center">
          <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {post.commentCount || 0} comments
          </span>
          {trending && (
            <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center">
              
              Trending
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;