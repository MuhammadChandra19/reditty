import { render } from '@testing-library/react';

/**
 * @param { import("react").ReactElement } ui
 * @param { TMock } mock
 * @returns
 */
export const renderComponent = (ui) => {
  return render(ui);
};
