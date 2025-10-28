// API Configuration
// Change this URL based on your environment
export const API_BASE_URL = 'http://localhost:8080';

export const API_ENDPOINTS = {
  // Auth
  SIGNUP: '/auth/signup',
  SIGNIN: '/auth/signin',
  ME: '/auth/me',
  
  // Users
  USERS: '/users',
  USER_BY_ID: (userId: string) => `/users/${userId}`,
  USERS_SEARCH: '/users/search',
  
  // Posts
  POSTS: '/posts',
  POST_BY_ID: (postId: string) => `/posts/${postId}`,
  
  // Feed
  FEED: '/feed',
  FEED_USER: (userId: string) => `/feed/user/${userId}`,
  
  // Follows
  FOLLOW: (userId: string) => `/follows/${userId}`,
  FOLLOWERS: '/follows/followers',
  FOLLOWING: '/follows/following',
  
  // Likes
  LIKE: (postId: string) => `/posts/${postId}/like`,
  POST_LIKES: (postId: string) => `/posts/${postId}/likes`,
  
  // Utility
  PING: '/ping',
} as const;
