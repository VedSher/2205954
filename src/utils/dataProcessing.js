export const processUserData = (users, posts) => {
    // Create a map to count posts per user
    const userPostCount = new Map();
    
    // Count posts for each user
    posts.forEach(post => {
      const userId = post.userId;
      userPostCount.set(userId, (userPostCount.get(userId) || 0) + 1);
    });
    
    // Combine user data with post counts
    const usersWithPostCount = users.map(user => ({
      ...user,
      postCount: userPostCount.get(user.id) || 0
    }));
    
    // Sort by post count in descending order
    return usersWithPostCount.sort((a, b) => b.postCount - a.postCount);
  };
  export const findTrendingPosts = (posts, comments) => {
    // Create a map to count comments per post
    const postCommentCount = new Map();
    
    // Count comments for each post
    comments.forEach(comment => {
      const postId = comment.postId;
      postCommentCount.set(postId, (postCommentCount.get(postId) || 0) + 1);
    });
    
    // Add comment count to each post
    const postsWithCommentCount = posts.map(post => ({
      ...post,
      commentCount: postCommentCount.get(post.id) || 0
    }));
    
    // Find maximum comment count
    let maxCommentCount = 0;
    postsWithCommentCount.forEach(post => {
      if (post.commentCount > maxCommentCount) {
        maxCommentCount = post.commentCount;
      }
    });
    
    // Filter posts with maximum comment count
    return postsWithCommentCount.filter(post => post.commentCount === maxCommentCount);
  };
  
  export const sortPostsByDate = (posts) => {
    // Sort posts by date (newest first)
    return [...posts].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  };  