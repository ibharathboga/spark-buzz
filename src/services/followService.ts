import { apiClient } from './api';
import { API_ENDPOINTS } from '@/config/api';
import { User } from '@/types';

export const followService = {
  async followUser(userId: string): Promise<void> {
    return apiClient.post<void>(API_ENDPOINTS.FOLLOW(userId));
  },

  async unfollowUser(userId: string): Promise<void> {
    return apiClient.delete<void>(API_ENDPOINTS.FOLLOW(userId));
  },

  async getFollowers(): Promise<User[]> {
    return apiClient.get<User[]>(API_ENDPOINTS.FOLLOWERS);
  },

  async getFollowing(): Promise<User[]> {
    return apiClient.get<User[]>(API_ENDPOINTS.FOLLOWING);
  },
};
