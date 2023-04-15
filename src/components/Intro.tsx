import Link from "next/link";

import { IconLink } from "@/components/IconLink";
import { Button } from "@/components/Button";

export function Logo({ className }: { className: string }) {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="50" height="50" rx="25" fill="#191C1D" />
      <ellipse
        opacity="0.15"
        cx="17.9292"
        cy="25.0842"
        rx="11.532"
        ry="11.6162"
        fill="#22D3EE"
      />
      <ellipse
        opacity="0.15"
        cx="32.239"
        cy="25.0842"
        rx="11.532"
        ry="11.6162"
        fill="#22D3EE"
      />
      <ellipse
        opacity="0.2"
        cx="21.4646"
        cy="25.0842"
        rx="11.532"
        ry="11.6162"
        fill="#22D3EE"
      />
      <ellipse
        opacity="0.2"
        cx="28.7036"
        cy="25.0842"
        rx="11.532"
        ry="11.6162"
        fill="#22D3EE"
      />
      <circle cx="25.0842" cy="25.0842" r="11.6162" fill="#22D3EE" />
    </svg>
  );
}

export function Intro() {
  return (
    <>
      <div>
        <Link href="/" className="flex items-center">
          <Logo className="inline-block h-8 w-auto" />
          <p className="ml-3 text-xl font-bold text-white">Particle</p>
        </Link>
      </div>
      <h1 className="mt-14 font-display text-4xl/tight font-light text-white">
        Take control of your{" "}
        <span className="text-cyan-400">digital universe</span>
      </h1>
      <p className="mt-4 text-sm/6 text-gray-300">
        Introducing Particle - the ultimate digital content manager. With
        Particle, you can easily organize and access all your digital content in
        one place. Our AI-powered search features allow you to quickly find what
        you need, while our natural language processing technology helps you
        better manage and categorize your content.
      </p>
      <div className="mt-8">
        <Button
          href={"/login"}
          arrow
          className="rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
        >
          Get started
        </Button>
      </div>
    </>
  );
}

export function IntroFooter() {
  return (
    <p className="flex items-baseline gap-x-2 text-[0.8125rem]/6 text-gray-500">
      Brought to you by{" "}
      <IconLink href="https://github.com/techyonx" compact>
        TechyonX
      </IconLink>
    </p>
  );
}
