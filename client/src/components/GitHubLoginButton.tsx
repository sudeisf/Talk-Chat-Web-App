'use client';
import github from '../../public/icons/github-svgrepo-com (1).svg';
import Image from 'next/image';

const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
const GITHUB_REDIRECT_URI = process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI;

export default function GitHubLoginButton() {
  const handleGitHubLogin = () => {
    if (!GITHUB_CLIENT_ID) {
      console.error('Missing NEXT_PUBLIC_GITHUB_CLIENT_ID');
      return;
    }

    const redirectUri =
      GITHUB_REDIRECT_URI || `${window.location.origin}/github/callback`;
    const state = crypto.randomUUID();
    sessionStorage.setItem('github_oauth_state', state);

    const githubURL = `https://github.com/login/oauth/authorize?client_id=${encodeURIComponent(GITHUB_CLIENT_ID)}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=user:email&state=${encodeURIComponent(state)}`;
    window.location.href = githubURL;
  };

  return (
    <button
      onClick={handleGitHubLogin}
      className="bg-white flex h-10 w-[380px] max-w-full items-center justify-center gap-2 rounded-md border px-4 text-sm text-black"
    >
      <Image src={github} width={20} height={20} alt={'github-logo'} />
      Continue with GitHub
    </button>
  );
}
