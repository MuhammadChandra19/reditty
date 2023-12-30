// __mocks__/zustand.ts
import { act } from '@testing-library/react';

const { create: actualCreate } = jest.requireActual('zustand');

/**@type { Set<() => void>} */
export const storeResetFns = new Set();

export const create = (stateCreator) => {
  const store = actualCreate(stateCreator);

  const initialState = store.getState();
  storeResetFns.add(() => store.setState(initialState, true));
  return store;
};

// Reset all stores after each test run
afterEach(() => {
  act(() => {
    storeResetFns.forEach((resetFn) => {
      resetFn();
    });
  });
});

// export { create };
