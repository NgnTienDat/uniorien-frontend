import { SPRING_API } from "@/lib/axiosConfig";
import { springEndpoint } from "@/lib/helper";


import { NextResponse } from "next/server";

export async function GET() {
  
  const response = await SPRING_API.get(springEndpoint.ALL_UNI_REVIEW_LIST);
  return NextResponse.json(response.data);
}


