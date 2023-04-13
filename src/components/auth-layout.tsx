import Navbar from "./navbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex flex-1 h-full flex-col items-center justify-center">
        {children}
      </main>
    </div>
  );
}
