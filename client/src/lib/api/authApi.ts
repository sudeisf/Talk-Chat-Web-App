// Pseudo-code
import API from './axiosInstance';
import {
  LoginCredentials,
  NewPasswordCredentials,
  RegisterCredentials,
  VerifyEmailCredentials,
  VerifyOTPCredentials,
  SetRoleCredentials
} from '@/types/auth';

export const loginUser = async (credentials: LoginCredentials) => {
  const response = await API.post('/users/auth/login/', credentials);
  return response.data;
};
export const registerUser = async (credentials: RegisterCredentials) => {
  const response = await API.post('/users/auth/register/', credentials);
  return response.data;
};

export const setRole = async (credentials: SetRoleCredentials) => {
  const response = await API.post(`/users/auth/set-role/`,
    {
      role : credentials.role
    }, 
    {withCredentials : true}
  );
  return response.data;
};

export const VerifyEmail = async (credentials: VerifyEmailCredentials) => {
  const response = await API.post('/users/auth/email/', credentials);
  return response.data;
};

export const verifyOTP = async (credentials: VerifyOTPCredentials) => {
  const response = await API.post('/users/auth/otp-verify/', credentials);
  return response.data;
};
export const resetPassword = async (credentials: NewPasswordCredentials) => {
  const response = await API.post('/users/auth/new-password/', credentials);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await API.get('/users/auth/me/');
  return response.data;
};
export const logoutUser = async () => {
  await API.post('/users/auth/logout/');
};
