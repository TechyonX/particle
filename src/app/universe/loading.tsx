"use client";
import AuthLayout from "@/components/auth-layout";

export default function UniverseLoading() {
  return (
    <AuthLayout>
      <div className="container mx-auto py-6 flex-1">
        <div className="flex flex-row">
          <div className="mx-auto w-full md:w-3/4 sm:mx-4 md:mx-0">
            <div className="columns-1 gap-3 py-8">Loading</div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
