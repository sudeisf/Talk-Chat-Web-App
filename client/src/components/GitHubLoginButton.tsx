'use client';
import github from '../../public/icons/github-svgrepo-com (1).svg';
import Image from 'next/image';

export default function GitHubLoginButton() {
  const handleGitHubLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI || `${window.location.origin}/github/callback`;

    if (!clientId) {
      console.error('Missing NEXT_PUBLIC_GITHUB_CLIENT_ID env variable');
      alert('GitHub Login is not configured correctly.');
      return;
    }

  
    let state;
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      state = crypto.randomUUID();
    } else {
      state = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    
   
    sessionStorage.setItem('github_oauth_state', state);

    const params = new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      scope: 'read:user user:email',
      state: state,
    });


    window.location.href = `https://github.com/login/oauth/authorize?${params.toString()}`;
  };

  return (
    <button
      type="button" 
      onClick={handleGitHubLogin}
      className="bg-card flex h-11 w-[380px] max-w-full items-center justify-center gap-2 rounded-md border-2 border-border px-4 text-sm font-medium text-foreground shadow-sm hover:bg-muted hover:border-foreground/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors"
    >
      <Image
        src={github}
        width={20}
        height={20}
        alt={'github-logo'}
        className="grayscale contrast-200 dark:invert"
      />
      Continue with GitHub
    </button>
  );
}