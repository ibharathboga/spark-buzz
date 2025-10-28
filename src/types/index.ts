export interface User {
  id: string;
  username: string;
  email: string;
  displayName: string;
  bio?: string;
  avatar?: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  createdAt: string;
}

export interface Post {
  id: string;
  content: string;
  authorId: string;
  author: User;
  likesCount: number;
  sharesCount: number;
  commentsCount: number;
  createdAt: string;
  isLiked?: boolean;
  isShared?: boolean;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'share';
  fromUser: User;
  post?: Post;
  content: string;
  read: boolean;
  createdAt: string;
}

export interface AuthUser {
  user: User;
  token: string;
}
