import { springEndpoint } from "@/lib/helper";
import { cookies } from "next/headers";


import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const accessToken = (await cookies()).get('accessToken')?.value;
  if (!accessToken) {
    return NextResponse.json(
      { message: "Unauthorized: missing token" },
      { status: 401 }
    );
  }
  try {
    const { universityId, content } = await req.json();

    if (!universityId || !content) {
      return NextResponse.json(
        { message: "universityId and content are required" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${process.env.BACKEND_URL}${springEndpoint.ADD_COMMENT}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ universityId, content }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          message: errorData.message || "Backend error",
        },
        { status: response.status }
      );
    }
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error('Error adding university comment:', error);
    return NextResponse.json(
      { message: "Failed to add comment" },
      { status: 500 }
    );
  }
}


