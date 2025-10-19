import { cookies } from "next/headers";


import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(`${process.env.BACKEND_URL}/uni/`);
  
  const data = await response.json();
  return NextResponse.json(data);
}


