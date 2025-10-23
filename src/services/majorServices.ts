import { NEXT_API } from "@/lib/axiosConfig";

export async function getMajorGroups() {


    const res = await NEXT_API.get("/api/majors");

    if (res.status !== 200) {
        throw new Error(`Failed to fetch major groups: ${res.status}`);
    }

    return res.data.result;
}

