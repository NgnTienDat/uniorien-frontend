// app/api/user/me/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
    const accessToken = (await cookies()).get('accessToken')?.value;

    // No token = not authenticated
    if (!accessToken) {
        return NextResponse.json({ user: null }, { status: 200 });
    }

    try {
        // Verify token with Spring Boot
        const response = await fetch(
            `${process.env.BACKEND_URL}/api/v1/users/my-info`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
                cache: 'no-store',
            }
        );

        if (!response.ok) {
            // Token invalid or expired
            return NextResponse.json({ user: null }, { status: 200 });
        }

        const data = await response.json();

        return NextResponse.json({
            user: data.result,
        });

    } catch (error) {
        console.error('Failed to fetch user:', error);
        return NextResponse.json({ user: null }, { status: 200 });
    }
}