import { SPRING_API } from "@/lib/axiosConfig";
import { NextResponse } from "next/server";

export async function GET() {
  const response = await SPRING_API.get("/majors/major-groups");
  return NextResponse.json(response.data);
}

