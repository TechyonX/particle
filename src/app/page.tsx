"use client";
import CmdK from "@/components/cmdk";
import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [isCmdKOpen, setIsCmdKOpen] = useState(false);
  return (
    <div className="flex flex-col min-h-screen">
      <CmdK isOpen={isCmdKOpen} setIsOpen={setIsCmdKOpen} />
      <main className="flex flex-1 h-full flex-col items-center justify-center">
        <div className="relative text-gray-800 dark:text-gray-200 text-center py-16">
          <h1 className="text-5xl font-bold">Particle</h1>
          <p className="text-xl">Build your own universe!</p>
          <div className="mt-4">
            <Link href="/login">
              <div className="rounded-md p-1 text-lg bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-particle-700 via-particle-600 to-teal-700 hover:to-particle-700 hover:via-particle-600 hover:from-teal-700 transform hover:scale-105 transition ease-in-out">
                <div className="rounded-md h-full w-full px-8 py-4 bg-gray-900/90 text-white">
                  Get started
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
