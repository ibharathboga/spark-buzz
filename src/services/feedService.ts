import { apiClient } from './api';
import { API_ENDPOINTS } from '@/config/api';
import { Post } from '@/types';

export const feedService = {
  async getPersonalizedFeed(page = 0, size = 20): Promise<Post[]> {
    return apiClient.get<Post[]>(`${API_ENDPOINTS.FEED}?page=${page}&size=${size}`);
  },

  async getUserFeed(userId: string): Promise<Post[]> {
    return apiClient.get<Post[]>(API_ENDPOINTS.FEED_USER(userId));
  },
};
