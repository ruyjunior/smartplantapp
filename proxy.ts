
import { auth } from "@/lib/auth"; // Certifique-se de que auth está exportado corretamente
import { NextResponse } from "next/server";

export async function proxy(request: Request) {
  const session = await auth(); // auth() já retorna os dados da sessão corretamente
  if (!session.user) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  const isLoggedIn = !!session?.user; // Agora acessamos session.user diretamente

  const { pathname } = new URL(request.url);
  const isPublicRoute = pathname === "/" || pathname.startsWith("/signin") || pathname === "/signup";

  if (!isPublicRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/:path*"],
};