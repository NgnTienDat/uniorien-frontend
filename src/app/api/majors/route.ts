import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(`${process.env.BACKEND_URL}/majors/major-groups`);
  
  const data = await response.json();
  return NextResponse.json(data);
}

