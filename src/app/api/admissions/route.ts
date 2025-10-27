import { NextResponse } from "next/server";
import { SPRING_API } from "@/lib/axiosConfig";
import { springEndpoint } from "@/lib/helper";

// export async function GET(req: Request) {
//     const { searchParams } = new URL(req.url);
//     const code = searchParams.get("code");
//     const year = searchParams.get("year");
//     const admissionMethod = searchParams.get("admissionMethod");

//     if (!code) {
//         return NextResponse.json(
//             { code: 400, message: "Missing university code", result: null },
//             { status: 400 }
//         );
//     }

//     try {
//         const res = await SPRING_API.get(`${springEndpoint.UNIVERSITY_BENCHMARKS}${code}`, {
//             params: { year, admissionMethod },
//         });

//         return NextResponse.json(res.data);
//     } catch (error: any) {
//         console.error("API error:", error);
//         return NextResponse.json(
//             {
//                 code: error.response?.status || 500,
//                 message: error.response?.data?.message || "Internal Server Error",
//                 result: null,
//             },
//             { status: error.response?.status || 500 }
//         );
//     }
// }

export const revalidate = 60 * 60 * 24; // ✅ Cache 24h (24 * 60 * 60 giây)

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const year = searchParams.get("year");
    const admissionMethod = searchParams.get("admissionMethod");

    if (!code) {
        return NextResponse.json(
            { code: 400, message: "Missing university code", result: null },
            { status: 400 }
        );
    }

    try {
        // ✅ Gọi backend (Spring)
        const res = await SPRING_API.get(`${springEndpoint.UNIVERSITY_BENCHMARKS}${code}`, {
            params: { year, admissionMethod },
        });

        // ✅ Trả kết quả + Next sẽ cache lại
        return NextResponse.json(res.data, {
            status: 200,
            headers: {
                "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=43200",
            },
        });
    } catch (error: any) {
        console.error("API error:", error);
        return NextResponse.json(
            {
                code: error.response?.status || 500,
                message: error.response?.data?.message || "Internal Server Error",
                result: null,
            },
            { status: error.response?.status || 500 }
        );
    }
}
