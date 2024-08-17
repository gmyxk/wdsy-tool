import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      data: 1212,
    },
    {
      status: 200,
    }
  );
}
