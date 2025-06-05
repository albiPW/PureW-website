import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { siteConfig } from "./config/site-config"

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const path = url.pathname

  // Check if the path is for an unpublished section
  if (path === "/trade" && !siteConfig.publishedSections.trade) {
    url.pathname = "/coming-soon"
    return NextResponse.redirect(url)
  }

  if (path === "/invest" && !siteConfig.publishedSections.invest) {
    url.pathname = "/coming-soon"
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/trade", "/invest"],
}
