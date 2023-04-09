"use client";

import { Inter } from "next/font/google";
import { useSupabase } from "./supabase-provider";
import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { Database } from "./lib/database.types";

const inter = Inter({ subsets: ["latin"] });

interface Particle {
  content: string;
  created_at: string;
  description: string | null;
  id: string;
  is_archived: boolean;
  is_public: boolean;
  title: string | null;
  type: number;
  updated_at: string;
  user_id: string;
}

export default function Home() {
  const { supabase } = useSupabase();
  const [user, setUser] = useState<User | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  async function getUser() {
    const { data } = await supabase.auth.getSession();
    setUser(data.session?.user || null);
  }

  async function getParticles() {
    if (!user) {
      return;
    }
    supabase
      .from("particle")
      .select("*")
      .then((res) => {
        let particles: Particle[] = [];
        res.data?.map((particle) => {
          particles.push(particle);
        });
        setParticles(particles);
      });
  }

  useEffect(() => {
    getUser();
  }, [supabase]);

  useEffect(() => {
    if (!user) {
      setParticles([]);
      return;
    }
    getParticles();
  }, [supabase, user]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        {user ? (
          <p>
            Welcome, {user.email}!{" "}
            <button
              className="underline"
              onClick={async () => {
                const { error } = await supabase.auth.signOut();
                setUser(null);
                if (error) {
                  console.log(error);
                }
              }}
            >
              Sign out
            </button>
          </p>
        ) : (
          <p>
            <Link className="underline" href={"login"}>
              Login
            </Link>
            <br />
            <button
              className="underline"
              onClick={async () => {
                const { error } = await supabase.auth.signInWithOAuth({
                  provider: "google",
                });
                if (error) {
                  console.log(error);
                }
              }}
            >
              Login with Google
            </button>
          </p>
        )}
        {particles.map((particle) => (
          <div key={particle.id} className="m-3">
            <p className="text-xl">{particle.title || "Untitled"}</p>
            <p className="text-sm">{particle.description}</p>
            <p>{particle.content}</p>
          </div>
        ))}
        {user && (
          <button
            className="border-2 border-white rounded-md p-2"
            onClick={async () => {
              const { error } = await supabase.from("particle").insert({
                content: "Test particle content here",
                type: 2,
                user_id: user.id,
                description: "Test description",
                title: "Test",
              });
              getParticles();
              if (error) {
                console.log(error);
              }
            }}
          >
            Add Particle
          </button>
        )}
      </div>
    </main>
  );
}
