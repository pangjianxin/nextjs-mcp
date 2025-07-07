import { auth } from "@/auth";
import { abpApplicationConfigurationGet } from "@/openapi";
import { client } from "@/openapi-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const session = await auth();
  const response = await abpApplicationConfigurationGet({
    client,
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
    query: {
      IncludeLocalizationResources: false,
    },
  });
  return NextResponse.json(response.data);
}
