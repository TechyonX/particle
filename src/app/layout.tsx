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
    <html lang="en" className="h-full dark bg-gray-50 dark:bg-gray-900">
      <body className="min-h-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
        <SupabaseProvider>{children}</SupabaseProvider>
      </body>
    </html>
  );
}
