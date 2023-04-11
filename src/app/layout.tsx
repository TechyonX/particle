import "./globals.css";
import SupabaseProvider from "./supabase-provider";

export const metadata = {
  title: "Particle",
  description: "Particle is a simple note-taking app.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50 dark:bg-gray-900">
      <body className="min-h-full bg-gray-50 dark:bg-gray-900">
        <SupabaseProvider>{children}</SupabaseProvider>
      </body>
    </html>
  );
}
