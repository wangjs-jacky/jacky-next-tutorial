import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 中间件函数
export function middleware(request: NextRequest) {
  // 获取请求路径
  const path = request.nextUrl.pathname;

  // 示例：记录访问日志
  console.log(`[Middleware] ${request.method} ${path}`);

  // 示例：添加自定义响应头
  const response = NextResponse.next();
  response.headers.set("x-custom-header", "middleware-header");
  response.headers.set("x-pathname", path);

  // 示例：重定向（如果需要）
  // if (path === "/old-path") {
  //   return NextResponse.redirect(new URL("/new-path", request.url));
  // }

  // 示例：重写 URL（如果需要）
  // if (path.startsWith("/api/rewrite")) {
  //   return NextResponse.rewrite(new URL("/api/hello", request.url));
  // }

  return response;
}

// 配置中间件匹配的路径
export const config = {
  matcher: [
    /*
     * 匹配所有请求路径，除了：
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};

