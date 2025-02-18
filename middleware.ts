import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const url = request.nextUrl;
    const hostname = request.headers.get('host');
    if (hostname === 'www.jaystravels.co.uk' || hostname === 'https://www.jaystravels.co.uk') {
      return NextResponse.redirect(`https://jaystravels.co.uk${url.pathname}`, 301);
  }

  return NextResponse.next();
}
  export const config = {
    matcher: '/:path*', // Apply this middleware to all routes
};  
