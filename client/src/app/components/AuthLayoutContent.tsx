import Link from 'next/link';
import Image from 'next/image';

interface AuthLayoutProps {
  children: React.ReactNode;
  pageType: 'Login' | 'Register';
}

export default function AuthLayoutContent({
  children,
  pageType,
}: AuthLayoutProps) {
  return (
    <>
      {pageType === 'Login' ? (
        <div className="flex justify-between p-4">
          <Link href="/" aria-label="Go to home page">
            <Image
              src="/svg/logo.svg"
              width={34}
              height={34}
              alt="Talkit logo"
              className="dark:brightness-0 dark:invert"
            />
          </Link>
          <div className="flex space-x-0.5 text-md text-muted-foreground">
            <p className="font-sans">Don't have an account?</p>
            <Link href="/register" className="font-sans underline text-foreground">
              Sign up
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex justify-between p-4">
          <Link href="/" aria-label="Go to home page">
            <Image
              src="/svg/logo.svg"
              width={34}
              height={34}
              alt="Talkit logo"
              className="dark:brightness-0 dark:invert"
            />
          </Link>
          <div className="flex space-x-0.5 text-md text-muted-foreground">
            <p className="font-sans">Already have an account?</p>
            <Link href="/login" className="font-sans underline text-foreground">
              Sign in{' '}
            </Link>
          </div>
        </div>
      )}
      <div>{children}</div>
    </>
  );
}
