'use server';
import { COOKIE_KEY_ACCESS_TOKEN } from '@/utils/jwt/parseJwt';
import { cookies } from 'next/headers';
import { requestAccessToken } from "../auth/requestAccessToken";

export const requester = () => {
  const OAUTH_URL = 'https://oauth.reddit.com/';

  const request = async (url) => {
    let token = cookies().get(COOKIE_KEY_ACCESS_TOKEN)?.value || '';
    if(!token) {
      token = await requestAccessToken()
    }
    const res = await fetch(`${OAUTH_URL}${url}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      redirect: 'follow',
    }).then((res) => res.json());

    return res;
  };

  return {
    request,
  };
};
