import { parseJWT } from './parseJwt';

/**
 *
 * @param { Number } time
 * @return { Boolean }
 */

export const isExpired = (time) => {
  return Date.now() >= Number(time) * 1000;
};

/**
 *
 * @param { String } token
 * @return { Boolean }
 */

export const isInvalidOrExpired = (token) => {
  const data = parseJWT(token);
  const isInvalidToken = data.exp === undefined;

  return isInvalidToken || isExpired(data.exp);
};
