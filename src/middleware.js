import { NextRequest, NextResponse } from 'next/server';
import { COOKIE_KEY_ACCESS_TOKEN } from './utils/jwt/parseJwt';
import { validateAccessToken } from './utils/auth/validateAccessToken';

/**
 *
 * @param {NextRequest} request
 */
export const middleware = async (request) => {
  const accessTokenCookie = request.cookies.get(COOKIE_KEY_ACCESS_TOKEN)?.value;

  const validatedAccessToken = await validateAccessToken(accessTokenCookie);

  const response = NextResponse.next();

  if (!!validateAccessToken) {
    response.cookies.set(COOKIE_KEY_ACCESS_TOKEN, validatedAccessToken, {
      maxAge: 86400,
    });
  }

  return response;
};

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
