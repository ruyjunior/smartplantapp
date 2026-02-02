// app/(public)/layout.tsx
"use client";

import { useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("light");
  }, [setTheme]);

  return <main className="min-h-screen bg-white text-gray-900">{children}</main>;
}
