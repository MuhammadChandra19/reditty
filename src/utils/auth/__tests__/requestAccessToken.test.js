const { requestAccessToken } = require('../requestAccessToken');

const MOCK_ERROR = jest.fn()
global.console.error = MOCK_ERROR

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ access_token: 'token' }),
  }),
)

describe('Request Access Token', () => {
  test('should return access token', async () => {
    const result = await requestAccessToken();
    expect(result).toEqual('token');

    expect(fetch).toHaveBeenLastCalledWith(
      'https://www.reddit.com/api/v1/access_token',
      {
        body: '{"grant_type":"password","username":"theusername","password":"itspassword"}',
        headers: {
          Authorization: 'Basic YmFzaWMta2V5OmJhc2ljLXNlY3JldA==',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
        redirect: 'follow',
      },
    );
  });

  test('should handle error when request', async () => {
    fetch.mockImplementationOnce(() => Promise.reject('Error getting token'))

    await requestAccessToken();
    expect(MOCK_ERROR).toHaveBeenLastCalledWith('Error getting token')
  })
});

