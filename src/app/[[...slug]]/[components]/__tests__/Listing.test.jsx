import { renderComponent } from '@/utils/test';
// import { Suspense } from "react"
import { default as Listing } from '../Listing';
import { screen } from '@testing-library/react';
import { data } from '@/lib/mocks/subreddit_mock';

const render = async () =>
  renderComponent(await Listing({ pathName: '/r/popular/hot' }));
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(data),
  }),
);
describe('Listing subreddit test', () => {
  test('should render correctly', async () => {
    await render();
    const subreddit = await screen.findByTestId('subreddit-18uekx9');
    expect(subreddit).toBeInTheDocument();
  });
});
