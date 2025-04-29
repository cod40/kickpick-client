// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const token = request.cookies.get("token");
//   const isAuthenticated = !!token;
//   const isLoginPage = request.nextUrl.pathname === "/login";

//   // 로그인된 사용자가 /login 페이지 접근 시 홈으로 리다이렉트
//   if (isAuthenticated && isLoginPage) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }

//   // 로그인되지 않은 사용자가 보호된 페이지 접근 시 로그인 페이지로 리다이렉트
//   if (!isAuthenticated && !isLoginPage) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next();
// }

// // 미들웨어가 적용될 경로 설정
// // export const config = {
// //   matcher: [
// //     /*
// //      * Match all request paths except for the ones starting with:
// //      * - api (API routes)
// //      * - _next/static (static files)
// //      * - _next/image (image optimization files)
// //      * - favicon.ico (favicon file)
// //      */
// //     "/((?!api|_next/static|_next/image|favicon.ico).*)",
// //   ],
// // };
