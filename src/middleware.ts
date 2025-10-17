import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // chỉ kiểm tra các route /api/**
  if (req.nextUrl.pathname.startsWith("/api/")) {
    const internalKey = req.headers.get("x-internal-key");

    if (internalKey !== process.env.INTERNAL_SECRET_KEY) {
      return NextResponse.json(
        { message: "Forbidden: External access not allowed" },
        { status: 403 }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"], // chỉ áp dụng cho route API
};
