import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
    const accessToken = (await cookies()).get('accessToken')?.value;

    // Notify backend to invalidate token
    if (accessToken) {
        try {
            await fetch(
                `${process.env.BACKEND_URL}/auth/logout`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token: accessToken }),
                }
            );
        } catch (error) {
            console.error('Backend logout failed:', error);
        }
    }

    // Clear all cookies
    (await cookies()).delete('accessToken');
    (await cookies()).delete('refreshToken');

    return NextResponse.json({ success: true });
}