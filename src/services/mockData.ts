import { User, Post, Notification } from '@/types';

// Mock users
export const mockUsers: User[] = [
  {
    id: '1',
    username: 'john_doe',
    email: 'john@example.com',
    displayName: 'John Doe',
    bio: 'Software developer | React enthusiast | Coffee lover ☕',
    followersCount: 1234,
    followingCount: 567,
    postsCount: 89,
    createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    username: 'jane_smith',
    email: 'jane@example.com',
    displayName: 'Jane Smith',
    bio: 'Designer | UX/UI | Making the web beautiful 🎨',
    followersCount: 2345,
    followingCount: 432,
    postsCount: 156,
    createdAt: new Date(Date.now() - 300 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    username: 'mike_wilson',
    email: 'mike@example.com',
    displayName: 'Mike Wilson',
    bio: 'Tech blogger | Startup founder | Always learning 🚀',
    followersCount: 5678,
    followingCount: 890,
    postsCount: 234,
    createdAt: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Mock posts
export const mockPosts: Post[] = [
  {
    id: '1',
    content: 'Just shipped a new feature! React 18 concurrent rendering is amazing. The performance improvements are incredible! 🚀',
    authorId: '1',
    author: mockUsers[0],
    likesCount: 45,
    sharesCount: 12,
    commentsCount: 8,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    isLiked: false,
    isShared: false,
  },
  {
    id: '2',
    content: 'Finished redesigning our landing page. Clean, minimal, and conversion-focused. Would love to hear your thoughts! 💭',
    authorId: '2',
    author: mockUsers[1],
    likesCount: 89,
    sharesCount: 23,
    commentsCount: 15,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    isLiked: true,
    isShared: false,
  },
  {
    id: '3',
    content: 'Writing a blog post about building scalable APIs. What topics would you like me to cover? Drop your suggestions below 👇',
    authorId: '3',
    author: mockUsers[2],
    likesCount: 123,
    sharesCount: 34,
    commentsCount: 42,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    isLiked: false,
    isShared: true,
  },
];

// Mock notifications
export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    fromUser: mockUsers[1],
    post: mockPosts[0],
    content: 'liked your post',
    read: false,
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    type: 'follow',
    fromUser: mockUsers[2],
    content: 'started following you',
    read: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    type: 'share',
    fromUser: mockUsers[0],
    post: mockPosts[1],
    content: 'shared your post',
    read: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
];
