import '@testing-library/jest-dom';
import nextRouterMock from 'next-router-mock';

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: () => ({
    ...nextRouterMock,
    ...global.router,
  }),
}));
