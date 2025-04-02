import React from 'react';
import { useAPI } from '../hooks/useAPI';
import { findTrendingPosts } from '../utils/dataProcessing';
import PostCard from './PostCard';
import Loading from './Loading';

const TrendingPosts = () => {
  const { data: posts, loading: loadingPosts, error: postError } = useAPI('/posts');
  const { data: comments, loading: loadingComments, error: commentError } = useAPI('/comments');
  
  const loading = loadingPosts || loadingComments;
  const error = postError || commentError;
  
  let trendingPosts = [];
  
  if (posts && comments) {
    trendingPosts = findTrendingPosts(posts, comments);
  }
  
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Trending Posts</h1>
      
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : (
        <div>
          {trendingPosts.length > 0 ? (
            <div className="space-y-4">
              {trendingPosts.map(post => (
                <PostCard key={post.id} post={post} trending={true} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No trending posts found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TrendingPosts;