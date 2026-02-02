import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tag, value, idmachine } = body;

    if (!tag || value === undefined || !idmachine) {
      return NextResponse.json(
        { error: "Campos obrigatórios ausentes" },
        { status: 400 }
      );
    }

    await sql`
      INSERT INTO smartplantapp.counts (tag, value, idmachine)
      VALUES (${tag}, ${value}, ${idmachine})
    `;

    return NextResponse.json(
      { message: "Created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Database Error: Failed to Create.",
        message: error instanceof Error ? error.message : error,
      },
      { status: 500 }
    );
  }
}
