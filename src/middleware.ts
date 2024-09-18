import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

// This function can be marked `async` if using `await` inside
const protectedRoutes = ["/checkout"];
const validPaths = [
  "/",
  "/products/:productsID*",
  "/login",
  "/register",
  "/checkout",
];
// const publicRoutes = ["/login", "/signup", "/"];
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const url = request.nextUrl;
  //   const isPublicRoutes = publicRoutes.includes(path)
  const isProtectedRoutes = protectedRoutes.includes(path);
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  console.log("token", token?.value);

  if (isProtectedRoutes && !token?.value) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (!validPaths.includes(url.pathname) && !url.pathname.startsWith("/api")) {
    // Redirect to custom 404 page for invalid paths
    return NextResponse.rewrite(new URL("/", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
