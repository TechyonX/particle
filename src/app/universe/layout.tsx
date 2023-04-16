"use client";

import AuthLayout from "@/components/auth-layout";
import SideNav from "@/components/sidenav";

export default function UniverseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthLayout>
      <div className="container mx-auto py-6 flex flex-1 flex-col">
        <div className="flex flex-row flex-1">
          <div className="hidden md:block w-1/4">
            <SideNav />
          </div>
          <div className="flex flex-col flex-1 mx-auto w-full md:w-3/4 sm:mx-4 md:mx-0">
            <div className="flex-1 columns-1 gap-3 pb-8">{children}</div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
