/**
 * Request Accext Token
 *
 * @returns { Promise<String> }
 */

export const requestAccessToken = async () => {
  const BASIC_AUTH = btoa(
    `${process.env.REDDIT_BASIC_KEY}:${process.env.REDDIT_BASIC_SECRET}`,
  );

  const USERNAME = process.env.REDDIT_USERNAME;
  const PASSWORD = process.env.REDDIT_PASSWORD;

  var requestOptions = {
    method: 'POST',
    headers: {
      Authorization: `Basic ${BASIC_AUTH}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      grant_type: 'password',
      username: USERNAME,
      password: PASSWORD,
    }),
    redirect: 'follow',
  };

  try {
    const { access_token } = await fetch(
      'https://www.reddit.com/api/v1/access_token',
      requestOptions,
    ).then((res) => res.json());
    return access_token;
  } catch (e) {
    console.error(e);
  }
};
