// app/api/auth/oauth/callback/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
    try {
        const { code } = await request.json();

        // Call Spring Boot backend
        const response = await fetch(
            `${process.env.BACKEND_URL}/auth/outbound/authentication?code=${code}`,
            { method: 'POST' }
        );

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Authentication failed' },
                { status: response.status }
            );
        }

        const data = await response.json();
        const { token, user } = data.result;

        // ✅ Set HttpOnly cookies - SECURE!
        // cookies().set('accessToken', token, {
        (await cookies()).set('accessToken', token, {
            httpOnly: true, // ← CRITICAL: Cannot be accessed by JavaScript
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60, // 1 hour
            path: '/',
        });

        // Return user data (but NOT the token)
        return NextResponse.json({
            success: true,
            user,
        });

    } catch (error) {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}