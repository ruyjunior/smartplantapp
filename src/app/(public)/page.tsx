import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title:
    "Home | Smart Plants",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function LandingPage() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <h1 className="mb-8 font-bold text-gray-800 text-title-md dark:text-white/90 xl:text-title-2xl">
        Landing Page
      </h1>
      <Link
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        href="/dashboard"
      >

        <div>
          <span>
            Dashboard
          </span>
        </div>
      </Link>
    </div>
  );
}
