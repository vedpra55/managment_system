import * as jose from "jose";
import { NextResponse } from "next/server";

export async function middleware(req, res) {
  const bearerToken = req.headers.get("authorization");

  if (!bearerToken) {
    return new NextResponse(
      JSON.stringify({
        errorMessage: "Unauthorize request",
      }),
      { status: 401 }
    );
  }

  const token = bearerToken.split(" ")[1];

  if (!token) {
    return new NextResponse(
      JSON.stringify({
        errorMessage: "Unauthorize request",
      }),
      { status: 401 }
    );
  }

  const secrent = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);

  try {
    jose.jwtVerify(token, secrent);
  } catch (err) {
    return new NextResponse(
      JSON.stringify({
        errorMessage: "Unauthorize request",
      }),
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ["/api/auth/verifyToken"],
};
