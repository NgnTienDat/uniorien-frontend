import { NextRequest, NextResponse } from 'next/server';
import { springEndpoint } from '@/lib/helper';

interface ApiResponse<T> {
  code: number;
  message: string;
  result: T;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ universityCode: string }> }
) {
  try {
    const { universityCode } = await params;

    const response = await fetch(
      `${process.env.BACKEND_URL}${springEndpoint.ALL_COMMENT(universityCode)}`,
      {
        cache: 'no-store', // Don't cache for client requests
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { message: 'Failed to fetch comments from backend' },
        { status: response.status }
      );
    }

    const data: ApiResponse<any[]> = await response.json();

    if (data.code !== 200) {
      return NextResponse.json(
        { message: data.message || 'Backend error' },
        { status: 400 }
      );
    }

    return NextResponse.json(data.result);

  } catch (error) {
    console.error('API route error fetching comments:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}