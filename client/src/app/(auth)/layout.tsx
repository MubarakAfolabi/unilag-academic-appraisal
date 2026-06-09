import Image from "next/image";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 py-6"
      style={{ backgroundImage: "url('/login-bg.jpg')" }}
    >
      <div className="w-full max-w-2xl rounded-sm bg-white/75 shadow-2xl ring-1 ring-white/40 backdrop-blur-md">
        <div className="px-6 py-4 md:px-10 flex flex-col gap-2">
          <div className="flex justify-center">
            <div className="relative h-50 w-50">
              <Image
                src="/unilaglogo.svg"
                alt="Company Logo"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 140px, 140px"
              />
            </div>
          </div>
          {children}
        </div>
      </div>
    </main>
  );
}
