import '@testing-library/jest-dom';
import nextRouterMock from 'next-router-mock';

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: () => ({
    ...nextRouterMock,
    ...global.router,
  }),
}));

jest.mock('next/headers', () => ({
  ...jest.requireActual('next/headers'),
  cookies: () => ({
    ...jest.requireActual('next/headers').cookies,
    get: jest.fn(),
  }),
}));

const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;
