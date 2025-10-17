import Container from '@/components/ui/container'
import React from 'react'

// async function getUniversities() {
//     const res = await fetch(`${process.env.SITE_URL}/api/universities`, {
//         cache: "no-store",
//     });
//     const json = await res.json();
//     // console.log("universities:", json);
//     return json.result; // ✅ chỉ lấy mảng universities thôi
// }

export async function getUniversities() {
    const res = await fetch(`${process.env.SITE_URL}/api/universities`, {
        headers: {
            "x-internal-key": process.env.INTERNAL_SECRET_KEY!,
        },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch universities: ${res.status}`);
    }

    const json = await res.json();
    //     // console.log("universities:", json);
    return json.result; // ✅ chỉ lấy mảng universities thôi
}


async function BenchmarkPage() {



    const universities = await getUniversities();
    // console.log('universities', universities);

    return (
        <Container>
            <div className='h-[1000px] bg-gray-200'>
                Benchmark Page

                <div>
                    <h1>Universities</h1>
                    <ul>
                        {universities.map((u: any) => (
                            <li key={u.id}>{u.universityCode}</li>
                        ))}
                    </ul>
                </div>
            </div>


        </Container>
    )
}

export default BenchmarkPage