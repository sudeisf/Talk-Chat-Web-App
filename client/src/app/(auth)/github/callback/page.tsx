'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import API from '@/lib/api/axiosInstance';
import { SpinnerInfinity } from 'spinners-react';
import { parseDjangoError } from '@/lib/utils';

export default function GitHubCallback() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const code = params.get('code');
    const oauthError = params.get('error');
    const state = params.get('state');

    if (oauthError) {
      toast.error('GitHub authorization was canceled or failed');
      router.replace('/login');
      return;
    }

    const expectedState = sessionStorage.getItem('github_oauth_state');
    sessionStorage.removeItem('github_oauth_state');

    if (!code || !state || !expectedState || state !== expectedState) {
      toast.error('Invalid GitHub OAuth state. Please try again.');
      router.replace('/login');
      return;
    }

    API.post('/users/auth/github/', { code }, { withCredentials: true })
      .then((res) => {
        toast.success('Logged in via GitHub');
        const mustCompleteProfile =
          res.data?.created === true ||
          res.data?.next === '/complete-profile' ||
          res.data?.profile_completed === false ||
          res.data?.user?.role == null;
        const role = res.data?.user?.role;
        const roleDashboardMap: Record<string, string> = {
          learner: '/learner-dashboard',
          helper: '/dashboard',
        };

        if (mustCompleteProfile) {
          router.replace('/complete-profile');
        } else if (role && roleDashboardMap[role]) {
          router.replace(roleDashboardMap[role]);
        } else {
          router.replace('/');
        }
      })
      .catch((err) => {
        const parsedError = parseDjangoError(err);
        const backendMessage =
          parsedError.global?.[0] ||
          Object.values(parsedError.fieldErrors || {})?.[0]?.[0] ||
          'GitHub login failed';

        toast.error(backendMessage);
        console.error(err.response?.data || err.message);
        router.replace('/login');
      });
  }, [params, router]);

  return (
    <>
      <div className="flex items-center justify-center h-[60vh]">
        <SpinnerInfinity
          thickness={100}
          secondaryColor="#f0f0f0"
          color="#EA580C"
          size={90}
        />
      </div>
    </>
  );
}
