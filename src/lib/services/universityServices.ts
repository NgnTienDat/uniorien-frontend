export async function getUniversities() {
    const res = await fetch(`${process.env.FRONTEND_URL}/api/universities`, {
        headers: {
            "x-internal-key": process.env.INTERNAL_SECRET_KEY!,
        },
    });

    if (!res.ok) {
        throw new Error(`Failed to fetch universities: ${res.status}`);
    }

    const json = await res.json();
    //     // console.log("universities:", json);
    return json.result;
}
