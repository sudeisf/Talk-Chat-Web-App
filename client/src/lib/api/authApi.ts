// Pseudo-code
import axiosInstance from './axiosInstance';
import { LoginCredentials, RegisterData } from '@/types/auth';
export const loginUser = async (credentials: LoginCredentials) => {
  const response = await axiosInstance.post('/api/auth/login/', credentials);
  return response.data;
};
export const registerUser = async (data: RegisterData) => {
  const formData = new FormData();
  const response = await axiosInstance.post('/api/auth/register/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};
export const getCurrentUser = async () => {
  const response = await axiosInstance.get('/api/auth/user/');
  return response.data;
};
export const logoutUser = async () => {
  await axiosInstance.post('/api/auth/logout/');
};