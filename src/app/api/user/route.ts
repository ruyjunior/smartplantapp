// app/api/current-user/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { fetchByEmail } from "@/query/users/data";

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
        return NextResponse.json(null, { status: 401 });
    }

    // buscar no banco
    const user = await fetchByEmail(session.user.email);
    //console.log('Current User:', user);
    return NextResponse.json(user);
}
