"use client";
import InputForm from "@/components/input-form";
import Navbar from "@/components/navbar";
import SideNav from "@/components/sidenav";

export default function Example() {
  return (
    <div className="min-h-full">
      <Navbar />

      <main>
        <div className="container mx-auto py-6">
          <div className="flex flex-row">
            <div className="hidden md:block w-1/4">
              <SideNav />
            </div>
            <div className="mx-auto w-full md:w-3/4 sm:mx-4 md:mx-0">
              <InputForm />
              <div className="columns-3xs gap-3 py-8">
                {Array.from({ length: 100 }, (v, k) => k).map((number) => (
                  <div
                    key={number}
                    className="w-full bg-slate-200 hover:bg-slate-300"
                  >
                    <p>{number} random text</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
