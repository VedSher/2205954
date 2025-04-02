import React from 'react';
import { useAPI } from '../hooks/useAPI';
import { processUserData } from '../utils/dataProcessing';
import UserCard from './UserCard';
import Loading from './Loading';

const TopUsers = () => {
  const { data: users, loading: loadingUsers, error: userError } = useAPI('/users');
  const { data: posts, loading: loadingPosts, error: postError } = useAPI('/posts');
  
  const loading = loadingUsers || loadingPosts;
  const error = userError || postError;
  
  let topUsers = [];
  
  if (users && posts) {
    const processedUsers = processUserData(users, posts);
    topUsers = processedUsers.slice(0, 5);
  }
  
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Top 5 Users</h1>
      
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topUsers.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TopUsers;