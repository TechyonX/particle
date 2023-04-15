"use client";

import AuthLayout from "@/components/auth-layout";
import SideNav from "@/components/sidenav";
import Particles from "./components/particles";

export default function Universe() {
  return (
    <AuthLayout>
      <div className="container mx-auto py-6 flex-1">
        <div className="flex flex-row">
          <div className="hidden md:block w-1/4">
            <SideNav />
          </div>
          <div className="mx-auto w-full md:w-3/4 sm:mx-4 md:mx-0">
            <div className="columns-1 gap-3 pb-8">
              <Particles filter={{}} />
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
