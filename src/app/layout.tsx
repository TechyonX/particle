import { cookies } from "next/headers";
import { Rubik } from "next/font/google";
import "../styles/globals.css";
import SupabaseProvider from "../lib/supabase-provider";

const rubik = Rubik({
  subsets: ["latin", "cyrillic"],
  variable: "--font-rubik",
});

export const metadata = {
  title: "Particle - the ultimate digital content manager",
  description:
    "Particle - the ultimate digital content manager. With Particle, you can easily organize and access all your digital content in one place. Our AI-powered search features allow you to quickly find what you need, while our natural language processing technology helps you better manage and categorize your content.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme");
  return (
    <html
      lang="en"
      className={`${rubik.variable} h-full ${
        theme ? theme.value : "dark"
      } bg-gray-50 dark:bg-gray-900`}
    >
      <body className="min-h-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
        <SupabaseProvider>{children}</SupabaseProvider>
      </body>
    </html>
  );
}
