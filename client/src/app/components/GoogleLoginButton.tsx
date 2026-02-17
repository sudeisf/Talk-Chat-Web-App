'use client';
import API from '@/lib/api/axiosInstance';
import { toast } from 'sonner';
import { GoogleLogin } from '@react-oauth/google';
import { useRouter } from 'next/navigation';

export default function GoogleLoginButton() {
  const router = useRouter();
  const handleLogin = async (credentialResponse: any) => {
    const idToken = credentialResponse.credential;
    try {
      const res = await API.post(
        '/users/auth/google/',
        { id_token: idToken },
        { withCredentials: true }
      );
      toast.success('Logged in with Google');
      if (res.data?.created) {
        router.replace('/complete-profile');
      } else {
        router.replace('/');
      }
    } catch (err) {
      toast.error('Google login failed');
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleLogin}
      onError={() => toast.error('Google login failed')}
      theme="outline"
      size="large"
      shape="rectangular"
      logo_alignment="center"
      width={380}
      text="continue_with"
      locale={'en'}
      type="standard"
      ux_mode="popup"
      auto_select={false}
    />
  );
}
