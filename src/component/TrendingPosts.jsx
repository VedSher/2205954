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
    <div className="trending-posts-container">
      <h2 className="text-2xl font-bold mb-6">Trending Posts</h2>
      
      {loading ? (
        <div className="flex justify-center py-8">
          <Loading />
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p className="font-medium">Error: {error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingPosts.length > 0 ? (
            trendingPosts.map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="post-image-container h-48 overflow-hidden">
                  <img 
                    src={post.imageUrl || '/placeholder-image.jpg'} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <PostCard post={post} />
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              No trending posts found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TrendingPosts;