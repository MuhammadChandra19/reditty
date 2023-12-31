import { data } from '@/lib/mocks/subreddit_mock';
import { getListing } from '..';

const MOCK_ERROR = jest.fn();
describe('Service Test', () => {
  describe('Test: getListing', () => {
    beforeEach(() => {
      global.console.error = MOCK_ERROR;

      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve(data),
        }),
      );
    });

    test('Should return correct subreddit list', async () => {
      const { after, data } = await getListing('url');

      expect(fetch).toHaveBeenLastCalledWith('https://oauth.reddit.com/url', {
        headers: { Authorization: 'Bearer ' },
        method: 'GET',
        redirect: 'follow',
      });

      expect(data.length).toEqual(5);
      expect(after).toEqual('t3_18uuc40');
    });
  });
});
