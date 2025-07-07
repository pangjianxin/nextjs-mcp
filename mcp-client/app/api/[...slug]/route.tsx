import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
const EXTERNAL_API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Handles GET requests by forwarding them to an external API.
 * Retrieves the current session and uses the access token for authorization.
 *
 * @param {NextRequest} request - The incoming request object from Next.js.
 * @returns {Promise<Response>} - The response from the external API or an error response.
 */
export async function GET(request: NextRequest): Promise<Response> {
  const session = await auth();
  const path = request.nextUrl.pathname;
  try {
    return await fetch(`${EXTERNAL_API_URL}${path}${request.nextUrl.search}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}

/**
 * Handles POST requests by forwarding them to an external API.
 * Retrieves the current session and uses the access token for authorization.
 *
 * @param {NextRequest} request - The incoming request object from Next.js.
 * @returns {Promise<Response>} - The response from the external API.
 */
export async function POST(request: NextRequest): Promise<Response> {
  const session = await auth();
  const path = request.nextUrl.pathname;
  console.log(`POST: ${EXTERNAL_API_URL}${path}${request.nextUrl.search}`);
  const contentType = request.headers.get("Content-Type") || "application/json";
  let body: any;
  let headers: any = {
    Authorization: `Bearer ${session?.accessToken}`,
  };

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData();
    body = new FormData();
    formData.forEach((value, key) => {
      body.append(key, value);
    });
    // Do not set Content-Type header for FormData, browser will set it automatically
  } else {
    try {
      const jsonData = await request.json();
      body = JSON.stringify(jsonData);
      headers["Content-Type"] = "application/json";
    } catch (error) {
      console.error("Error parsing JSON:", error);
      body = JSON.stringify({});
      headers["Content-Type"] = "application/json";
    }
  }

  const response = await fetch(
    `${EXTERNAL_API_URL}${path}${request.nextUrl.search}`,
    {
      method: "POST",
      headers,
      body,
    }
  );
  if (response.status === 401) {
    return NextResponse.json(
      {
        error: {
          message: "登录信息已过期,请重新登录",
        },
      },
      { status: 401 }
    );
  }
  return response;
}

/**
 * Handles PUT requests by forwarding them to an external API.
 * Retrieves the current session and uses the access token for authorization.
 *
 * @param {NextRequest} request - The incoming request object from Next.js.
 * @returns {Promise<Response>} - The response from the external API.
 */
export async function PUT(request: NextRequest) {
  const session = await auth();
  const path = request.nextUrl.pathname;
  console.log(`${EXTERNAL_API_URL}${path}${request.nextUrl.search}`);
  const response = await fetch(
    `${EXTERNAL_API_URL}${path}${request.nextUrl.search}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
        "Content-Type": "application/json",
      },
      body: request.body,
      duplex: "half",
    } as RequestInit
  );

  if (response.status === 401) {
    return NextResponse.json(
      {
        error: {
          message: "登录信息已过期,请重新登录",
        },
      },
      { status: 401 }
    );
  }
  return response;
}

/**
 * Handles DELETE requests by forwarding them to an external API.
 * Retrieves the current session and uses the access token for authorization.
 *
 * @param {NextRequest} request - The incoming request object from Next.js.
 * @returns {Promise<Response>} - The response from the external API.
 */
export async function DELETE(request: NextRequest) {
  const session = await auth();
  const path = request.nextUrl.pathname;
  const url = `${EXTERNAL_API_URL}${path}${request.nextUrl.search}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (response.status === 401) {
    return NextResponse.json(
      {
        error: {
          message: "登录信息已过期,请重新登录",
        },
      },
      { status: 401 }
    );
  }
  return response;
}
