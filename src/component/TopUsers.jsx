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
    <div className="container mx-auto px-6 py-8 bg-white shadow-lg rounded-lg border border-gray-300">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8 border-b pb-4">Top 5 Users</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="text-red-500 text-center text-lg">Error: {error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {topUsers.map(user => (
            <div key={user.id} className="border border-gray-300 rounded-lg p-5 shadow-md bg-gray-50">
              <UserCard user={user} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TopUsers;
