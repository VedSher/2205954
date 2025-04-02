export const processUserData = (users, posts) => {
    const userPostCount = new Map();
    
    posts.forEach(post => {
      const userId = post.userId;
      userPostCount.set(userId, (userPostCount.get(userId) || 0) + 1);
    });
    
    const usersWithPostCount = users.map(user => ({
      ...user,
      postCount: userPostCount.get(user.id) || 0
    }));
    
    return usersWithPostCount.sort((a, b) => b.postCount - a.postCount);
  };
  export const findTrendingPosts = (posts, comments) => {
    const postCommentCount = new Map();
    
    comments.forEach(comment => {
      const postId = comment.postId;
      postCommentCount.set(postId, (postCommentCount.get(postId) || 0) + 1);
    });
    
    const postsWithCommentCount = posts.map(post => ({
      ...post,
      commentCount: postCommentCount.get(post.id) || 0
    }));
    
    let maxCommentCount = 0;
    postsWithCommentCount.forEach(post => {
      if (post.commentCount > maxCommentCount) {
        maxCommentCount = post.commentCount;
      }
    });
    
    return postsWithCommentCount.filter(post => post.commentCount === maxCommentCount);
  };
  
  export const sortPostsByDate = (posts) => {
    return [...posts].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  };  