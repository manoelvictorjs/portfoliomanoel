import { createProfileResponse } from "@/lib/server/services/profile.service";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(createProfileResponse(), {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
