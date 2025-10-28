import { apiClient } from './api';
import { API_ENDPOINTS } from '@/config/api';
import { User } from '@/types';

export const userService = {
  async getAllUsers(): Promise<User[]> {
    return apiClient.get<User[]>(API_ENDPOINTS.USERS);
  },

  async getUserById(userId: string): Promise<User> {
    return apiClient.get<User>(API_ENDPOINTS.USER_BY_ID(userId));
  },

  async updateUser(userId: string, data: Partial<User>): Promise<User> {
    return apiClient.put<User>(API_ENDPOINTS.USER_BY_ID(userId), data);
  },

  async searchUsers(query: string): Promise<User[]> {
    return apiClient.get<User[]>(`${API_ENDPOINTS.USERS_SEARCH}?q=${encodeURIComponent(query)}`);
  },
};
