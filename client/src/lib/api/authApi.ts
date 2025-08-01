// Pseudo-code
import API from './axiosInstance';
import { LoginCredentials, RegisterCredentials } from '@/types/auth';

export const loginUser = async (credentials: LoginCredentials) => {
  const response = await API.post('/users/auth/login/', credentials);
  return response.data;
};
export const registerUser = async (credentials: RegisterCredentials) => {
  const response = await API.post('/users/auth/register/', credentials);
  return response.data;
};
export const getCurrentUser = async () => {
  const response = await API.get('/api/auth/user/');
  return response.data;
};
export const logoutUser = async () => {
  await API.post('/api/auth/logout/');
};