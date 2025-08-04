
'use client';
import github from '../../public/icons/github-svgrepo-com (1).svg'
import Image from 'next/image';


const GITHUB_CLIENT_ID = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;

export default function GitHubLoginButton() {
  const handleGitHubLogin = () => {
    const redirectUri = 'http://localhost:3000/github/callback';
    const githubURL = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${redirectUri}&scope=user:email`;
    window.location.href = githubURL;
  };

  return (
    <button
      onClick={handleGitHubLogin}
      className="bg-white flex justify-center gap-2 font-snas border-2 rounded-sm  text-black px-4 py-2  w-full"
    >
      <Image src={github} width={20} height={20} alt={'github-logo'} /> 
      Continue with GitHub
    </button>
  );
}
