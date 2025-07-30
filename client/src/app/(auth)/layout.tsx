import type { Metadata } from "next";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Authentication",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-ful min-h-screen bg-black ">
         <div className="bg-gradient-to-tr flex flex-col justify-end-safe items-center from-black via-gray-900 to-orange-900/80 w-[45%] rounded-lg m-2 p-4">
       <div>
       <h2 className="text-white text-4xl font-bold">TalkIt</h2>
        <p className="text-white text-md mt-1 text-wrap font-sans">
          Connect and chat with friends in real-time.  <br/>
          Share ideas, laugh together, and stay close —
          <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            wherever you are.
          </span>
        </p>
       </div>
    </div>
        <div className="w-[55%] m-2 bg-white rounded-md  flex flex-col justify-between">
          <div className="flex justify-between p-4">
            <h1 className="bg-gradient-to-r from-orange-200 font-sans to-red-700 bg-clip-text text-transparent text-xl">Talkit</h1>
            <div className="flex space-x-0.5 text-md">
              <p className="font-sans">Did you forgot password?</p><Link href="/register" className="font-sans underline">Sign up</Link>
            </div>
          </div>
          <div>
          {children}
          </div>
          <div className="flex justify-between py-2 px-4 font-sans font-medium text-md  ">
            <p>2025</p>
            <p>Support</p>
          </div>
          </div>
    </div>
  );
}
