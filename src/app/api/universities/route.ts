import { cookies } from "next/headers";

// export async function GET() {
 

//   // Gọi đến Spring Boot backend
//   const res = await fetch(`${process.env.BACKEND_URL}/api/v1/uni/`, {
//     cache: "no-store",
//   });

//   const data = await res.json();
//   return Response.json(data);
// }

import { NextResponse } from "next/server";

export async function GET() {
  const response = await fetch(`${process.env.BACKEND_URL}/api/v1/uni/`);
  
  const data = await response.json();
  return NextResponse.json(data);
}

