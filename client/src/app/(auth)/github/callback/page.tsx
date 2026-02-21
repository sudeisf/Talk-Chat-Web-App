'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import API from '@/lib/api/axiosInstance';
import { SpinnerInfinity } from 'spinners-react';

export default function GitHubCallback() {
  const params = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const code = params.get('code');

    if (code) {
      API.post('/users/auth/github/', { code }, { withCredentials: true })
        .then((res) => {
          toast.success('Logged in via GitHub');
          const mustCompleteProfile =
            res.data?.created === true ||
            res.data?.next === '/complete-profile' ||
            res.data?.profile_completed === false ||
            res.data?.user?.role == null;

          if (mustCompleteProfile) {
            router.replace('/complete-profile');
          } else {
            router.replace('/');
          }
        })
        .catch((err) => {
          toast.error('GitHub login failed');
          console.error(err.response?.data || err.message);
        });
    }
  }, [params]);

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
