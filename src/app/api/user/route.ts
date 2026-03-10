import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { fetchByEmail } from "@/query/users/data";

export async function GET() {
    const session = await auth();

    if (!session?.user?.email) {
        return NextResponse.json(null, { status: 401 });
    }

    const user = await fetchByEmail(session.user.email);
    return NextResponse.json(user);
}
