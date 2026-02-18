'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Revalidate({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh(); // revalida silenciosamente
    }, 10000);

    return () => clearInterval(interval);
  }, [router]);

  return <>{children}</>;
}
