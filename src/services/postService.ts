import { apiClient } from './api';
import { API_ENDPOINTS } from '@/config/api';
import { Post } from '@/types';

interface CreatePostRequest {
  content: string;
}

interface UpdatePostRequest {
  content: string;
}

export const postService = {
  async getAllPosts(page = 0, size = 20): Promise<Post[]> {
    return apiClient.get<Post[]>(`${API_ENDPOINTS.POSTS}?page=${page}&size=${size}`);
  },

  async getPostById(postId: string): Promise<Post> {
    return apiClient.get<Post>(API_ENDPOINTS.POST_BY_ID(postId));
  },

  async createPost(data: CreatePostRequest): Promise<Post> {
    return apiClient.post<Post>(API_ENDPOINTS.POSTS, data);
  },

  async updatePost(postId: string, data: UpdatePostRequest): Promise<Post> {
    return apiClient.put<Post>(API_ENDPOINTS.POST_BY_ID(postId), data);
  },

  async deletePost(postId: string): Promise<void> {
    return apiClient.delete<void>(API_ENDPOINTS.POST_BY_ID(postId));
  },
};
