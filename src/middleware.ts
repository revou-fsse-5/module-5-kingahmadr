import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

// This function can be marked `async` if using `await` inside
const protectedRoutes = ["/checkout"];
// const publicRoutes = ["/login", "/signup", "/"];
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  //   const isPublicRoutes = publicRoutes.includes(path)
  const isProtectedRoutes = protectedRoutes.includes(path);
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  console.log("token", token?.value);

  if (isProtectedRoutes && !token?.value) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
