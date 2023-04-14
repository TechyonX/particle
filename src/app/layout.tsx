import { Rubik } from "next/font/google";
import "./globals.css";
import SupabaseProvider from "../lib/supabase-provider";

const rubik = Rubik({
  subsets: ["latin", "cyrillic"],
  variable: "--font-rubik",
});

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
    <html
      lang="en"
      className={`${rubik.variable} h-full bg-gray-50 dark:bg-gray-900`}
    >
      <body className="min-h-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
        <SupabaseProvider>{children}</SupabaseProvider>
      </body>
    </html>
  );
}
