import { apiClient } from './api';
import { API_ENDPOINTS } from '@/config/api';

export const likeService = {
  async likePost(postId: string): Promise<void> {
    return apiClient.post<void>(API_ENDPOINTS.LIKE(postId));
  },

  async unlikePost(postId: string): Promise<void> {
    return apiClient.delete<void>(API_ENDPOINTS.LIKE(postId));
  },

  async getPostLikes(postId: string): Promise<any[]> {
    return apiClient.get<any[]>(API_ENDPOINTS.POST_LIKES(postId));
  },
};
