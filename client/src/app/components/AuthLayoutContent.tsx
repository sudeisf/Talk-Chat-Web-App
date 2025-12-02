import Link from 'next/link';

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
          <h1 className="bg-gradient-to-r from-[#03624C] font-sans to-[#03624C]/80 bg-clip-text text-transparent text-xl">
            Talkit
          </h1>
          <div className="flex space-x-0.5 text-md">
            <p className="font-sans">Don't have an account?</p>
            <Link href="/register" className="font-sans underline">
              Sign up
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex justify-between p-4">
          <h1 className="bg-gradient-to-r from-[#03624C] font-sans to-[#03624C]/80 bg-clip-text text-transparent text-xl">
            Talkit
          </h1>
          <div className="flex space-x-0.5 text-md">
            <p className="font-sans">Already have an account?</p>
            <Link href="/login" className="font-sans underline">
              Sign in{' '}
            </Link>
          </div>
        </div>
      )}
      <div>{children}</div>
    </>
  );
}
