import SessionsList from "@/components/helper/sessionsList";


export default function SessionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <div className="flex bg-background ">
      <SessionsList/>
      <div className="flex flex-col  w-full">
            {children}
      </div>
    </div>
  );
}
