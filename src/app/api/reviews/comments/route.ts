// app/api/reviews/comments/route.ts
import { springEndpoint } from "@/lib/helper";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const accessToken = (await cookies()).get('accessToken')?.value;

    if (!accessToken) {
        return NextResponse.json(
            { message: "Unauthorized: Please login to add comments" },
            { status: 401 }
        );
    }

    try {
        const { universityId, content } = await request.json();
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

            if (response.status === 401) {
                return NextResponse.json(
                    { message: "Session expired. Please login again." },
                    { status: 401 }
                );
            }

            return NextResponse.json(
                { message: errorData.message || "Failed to add comment" },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data, { status: 201 });

    } catch (error) {
        console.error('Error adding university comment:', error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}