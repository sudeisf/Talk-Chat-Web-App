import { useMutation } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import {
  LoginCredentials,
  RegisterCredentials,
  VerifyEmailCredentials,
  VerifyOTPCredentials,
  SetRoleCredentials
} from '@/types/auth';
import {
  loginUser,
  registerUser,
  resetPassword,
  VerifyEmail,
  verifyOTP,
  setRole
} from '@/lib/api/authApi';
import { action } from '@/redux/slice/authSlice';

export const useLoginMutation = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  return useMutation({
    mutationKey: ['login'],
    mutationFn: (credentials: LoginCredentials) => loginUser(credentials),
    onSuccess: (data) => {
      dispatch(action.setAuth(data));
      const nextPath =
        data?.next ||
        (data?.profile_completed === false ? '/complete-profile' : '/');
      router.replace(nextPath);
    },
  });
};
export const useRegisterMutation = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  return useMutation({
    mutationKey: ['register'],
    mutationFn: (credentials: RegisterCredentials) => registerUser(credentials),
  });
};

export const useVerifyEmailMutation = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  return useMutation({
    mutationKey: ['verifyEmail'],
    mutationFn: (credentials: VerifyEmailCredentials) =>
      VerifyEmail(credentials),
  });
};

export const useSetRoleMutation = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  return useMutation({
    mutationKey: ['setRole'],
    mutationFn: (credentials: SetRoleCredentials) =>
      setRole(credentials),
  });
};

export const useVerifyOTPMutation = () => {
  const email = useAppSelector((state) => state.auth.email);
  const router = useRouter();
  return useMutation({
    mutationKey: ['verifyOTP'],
    mutationFn: async ({ code }: { code: number }) =>
      verifyOTP({ email, code }),
  });
};

export const useResetPasswordMutation = () => {
  const email = useAppSelector((state) => state.auth.email);
  const router = useRouter();
  return useMutation({
    mutationKey: ['resetPassword'],
    mutationFn: async ({
      new_password,
      confirm_password,
    }: {
      new_password: string;
      confirm_password: string;
    }) =>
      resetPassword({
        email,
        new_password,
        confirm_password,
      }),
  });
};
