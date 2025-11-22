import { NextRequest, NextResponse } from 'next/server';
import { springEndpoint } from '@/lib/helper';
import { CommentsPageResponse } from '@/types/review';

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
    const searchParams = request.nextUrl.searchParams;

    // Get pagination params from query string
    const page = searchParams.get('page') || '0';
    const size = searchParams.get('size') || '10';
    const sort = searchParams.get('sort') || 'createdAt,desc';

    const url = `${process.env.BACKEND_URL}${springEndpoint.ALL_COMMENT(universityCode)}?page=${page}&size=${size}&sort=${sort}`;

    const response = await fetch(url, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: 'Failed to fetch comments from backend' },
        { status: response.status }
      );
    }

    const data: ApiResponse<CommentsPageResponse> = await response.json();

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