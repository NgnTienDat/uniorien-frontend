import { springEndpoint } from '@/lib/helper';
import { NextRequest, NextResponse } from 'next/server';

interface ApiResponse<T> {
    code: number;
    message: string;
    result: T;
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ code: string }> }
) {
    try {
        const { code } = await params;
        const searchParams = request.nextUrl.searchParams;
        const year = searchParams.get('year');
        const admissionMethod = searchParams.get('admissionMethod');

        // Build query params
        const queryParams = new URLSearchParams();
        if (year) queryParams.append('year', year);
        if (admissionMethod) queryParams.append('admissionMethod', admissionMethod);

        const queryString = queryParams.toString();
        const url = `${process.env.BACKEND_URL}${springEndpoint.UNIVERSITY_BENCHMARKS}${code}${queryString ? `?${queryString}` : ''}`;

        // Call Spring Boot
        const response = await fetch(url, {
            cache: 'no-store', // Don't cache dynamic requests from client
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch admission details' },
                { status: response.status }
            );
        }

        const data: ApiResponse<any> = await response.json();

        if (data.code !== 200) {
            return NextResponse.json(
                { error: data.message || 'API error' },
                { status: 400 }
            );
        }

        return NextResponse.json(data.result);

    } catch (error) {
        console.error('API route error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}