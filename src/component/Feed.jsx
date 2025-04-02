import React, { useEffect, useState } from 'react';
import { useAPI } from '../hooks/useAPI';
import { sortPostsByDate } from '../utils/dataProcessing';
import PostCard from './PostCard';
import Loading from './Loading';

const Feed = () => {
  // Polling every 10 seconds for new posts
  const { data: posts, loading, error, refresh } = useAPI('/posts', 10000);
  const { data: comments } = useAPI('/comments', 10000);
  const { data: users } = useAPI('/users');
  
  const [feed, setFeed] = useState([]);
  
  useEffect(() => {
    if (posts && comments && users) {
      // Create a map for quick user lookups
      const userMap = new Map();
      users.forEach(user => userMap.set(user.id, user));
      
      // Create a map for comment counts
      const commentCountMap = new Map();
      comments.forEach(comment => {
        const count = commentCountMap.get(comment.postId) || 0;
        commentCountMap.set(comment.postId, count + 1);
      });
      
      // Enrich posts with user names and comment counts
      const enrichedPosts = posts.map(post => ({
        ...post,
        userName: userMap.get(post.userId)?.name || `User ${post.userId}`,
        commentCount: commentCountMap.get(post.id) || 0
      }));
      
      // Sort posts by timestamp (newest first)
      const sortedPosts = sortPostsByDate(enrichedPosts);
      
      setFeed(sortedPosts);
    }
  }, [posts, comments, users]);
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Latest Posts</h1>
        <button 
          onClick={refresh}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          Refresh
        </button>
      </div>
      
      {loading && feed.length === 0 ? (
        <Loading />
      ) : error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : (
        <div className="space-y-4">
          {feed.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;