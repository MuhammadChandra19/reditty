import { render } from '@testing-library/react';
/**
 * @typedef {Object} TMock
 * @property { ReturnType<typeof import("next/navigation").useRouter>} router
 *
 * @param { import("react").ReactElement } ui
 * @param { TMock } mock
 * @returns
 */
export const renderComponent = (ui, { router }) => {
  return render(ui);
};
