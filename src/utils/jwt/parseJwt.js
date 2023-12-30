export const COOKIE_KEY_ACCESS_TOKEN = 'access_token';

/**
 *  Convert JWT string to session Object
 *
 * @param { String } token
 * @typedef { Object } ParsedJWT
 * @property { String } sub
 * @property { Number } exp
 * @property { Number } iat
 *
 * @return { ParsedJWT }
 */

export const parseJWT = (token) => {
  try {
    let result = {};
    const base64Url = token.split('.')[1];

    if (token && base64Url) {
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        Buffer.from(base64, 'base64')
          .toString()
          .split('')
          .map((v) => `%${`00${v.charCodeAt(0).toString(16)}`.slice(-2)}`)
          .join(''),
      );
      result = JSON.parse(jsonPayload);
    }

    return result;
  } catch (e) {
    return {};
  }
};
