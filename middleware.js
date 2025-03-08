// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl;

  // Check if the request is coming from a 'www' subdomain
  if (url.hostname.startsWith('www.'||('www.jaystravels.co.uk')||('https://www.jaystravels.co.uk') )) {
    // Clone the URL and remove the 'www.' prefix
    const newHostname = url.hostname.replace('www.', '');
    const newUrl = new URL(url.toString());
    newUrl.hostname = newHostname;

    // Redirect to the non-www URL
    return NextResponse.redirect(newUrl);
  }

  // Continue with the request if no redirection is needed
  return NextResponse.next();
}

// Specify the paths where the middleware should run
export const config = {
  matcher: '/:path*', // Apply to all paths
};