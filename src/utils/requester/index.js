'use server';
import { COOKIE_KEY_ACCESS_TOKEN } from '@/utils/jwt/parseJwt';
import { cookies } from 'next/headers';

export const requester = () => {
  const OAUTH_URL = 'https://oauth.reddit.com/';

  const request = async (url) => {
    console.log(url);
    const token = cookies().get(COOKIE_KEY_ACCESS_TOKEN)?.value;
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
