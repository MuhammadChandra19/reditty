import { fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { default as ListingControl } from '../ListingControl';
import { renderComponent } from '@/utils/test';

const MOCK_PUSH = jest.fn();
const user = userEvent.setup();

global.router = {
  push: MOCK_PUSH,
};

const render = () =>
  renderComponent(<ListingControl params={['r', 'popular', 'hot']} />);

describe('ListingControl', () => {
  test.each([
    ['new', 'control-category-new', '/r/popular/new'],
    ['hot', 'control-category-hot', '/r/popular/hot'],
    ['top', 'control-category-top', '/r/popular/top'],
  ])('should change category: %s', (_, testId, path) => {
    const { getByTestId } = render();

    fireEvent.click(getByTestId(testId));

    expect(MOCK_PUSH).toHaveBeenLastCalledWith(path);
  });

  test('should change card type', async () => {
    const { getByTestId } = render();

    await user.click(getByTestId('square-card'));

    await user.click(getByTestId('action-type-compact'));

    expect(getByTestId('compact-card')).toBeInTheDocument();
  });

  test('should input filter', async () => {
    const { getByTestId } = render();

    await user.type(getByTestId('search-field'), 'holdMyBeer');
    await user.keyboard('{enter}');

    expect(MOCK_PUSH).toHaveBeenLastCalledWith('/r/holdMyBeer/hot');
  });
});
