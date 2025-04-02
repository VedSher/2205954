import React, { useEffect, useState } from 'react';
import { useAPI } from '../hooks/useAPI';
import { sortPostsByDate } from '../utils/dataProcessing';
import PostCard from './PostCard';
import Loading from './Loading';

const Feed = () => {
  const { data: posts, loading, error, refresh } = useAPI('/posts', 10000);
  const { data: comments } = useAPI('/comments', 10000);
  const { data: users } = useAPI('/users');
  
  const [feed, setFeed] = useState([]);
  
  useEffect(() => {
    if (posts && comments && users) {
      const userMap = new Map();
      users.forEach(user => userMap.set(user.id, user));
      
      const commentCountMap = new Map();
      comments.forEach(comment => {
        const count = commentCountMap.get(comment.postId) || 0;
        commentCountMap.set(comment.postId, count + 1);
      });
      
      const enrichedPosts = posts.map(post => ({
        ...post,
        userName: userMap.get(post.userId)?.name || `User ${post.userId}`,
        commentCount: commentCountMap.get(post.id) || 0
      }));
      
      const sortedPosts = sortPostsByDate(enrichedPosts);
      
      setFeed(sortedPosts);
    }
  }, [posts, comments, users]);
  
  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center w-full mb-6">
        <h1 className="text-2xl font-bold text-center mb-4 sm:mb-0">Latest Posts</h1>
        <button 
          onClick={refresh}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md flex items-center transition-colors duration-300"
        >
          Refresh
        </button>
      </div>
      
      {loading && feed.length === 0 ? (
        <div className="w-full flex justify-center">
          <Loading />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center w-full">Error: {error}</div>
      ) : (
        <div className="space-y-6 w-full">
          {feed.map(post => (
            <div key={post.id} className="flex justify-center">
              <div className="w-full">
                <PostCard post={post} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;