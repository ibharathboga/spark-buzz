import { apiClient } from './api';
import { API_ENDPOINTS } from '@/config/api';
import { User } from '@/types';

interface SignInRequest {
  email: string;
  password: string;
}

interface SignUpRequest {
  username: string;
  email: string;
  password: string;
  displayName?: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

export const authService = {
  async signIn(credentials: SignInRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.SIGNIN,
      credentials
    );
    localStorage.setItem('token', response.token);
    return response;
  },

  async signUp(userData: SignUpRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>(
      API_ENDPOINTS.SIGNUP,
      userData
    );
    localStorage.setItem('token', response.token);
    return response;
  },

  async getCurrentUser(): Promise<User> {
    return apiClient.get<User>(API_ENDPOINTS.ME);
  },

  logout() {
    localStorage.removeItem('token');
  },
};
