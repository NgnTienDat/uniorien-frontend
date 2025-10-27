import { NEXT_API } from "@/lib/axiosConfig";
import { nextEndpoint } from "@/lib/helper";
import next from "next";

export async function getMajorGroups() {


    const res = await NEXT_API.get(nextEndpoint.MAJOR_LIST);

    if (res.status !== 200) {
        throw new Error(`Failed to fetch major groups: ${res.status}`);
    }

    return res.data.result;
}

