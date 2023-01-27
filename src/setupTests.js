// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";
import { act } from "react-test-renderer";

// src/setupTests.js
import { server } from "./mocks/server.js";
import {
  authApi,
  productApi,
  productsApi,
  searchProductApi,
  store,
} from "./utils/store/index.js";
// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
beforeEach(() => {
  // IntersectionObserver isn't available in test environment
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
});
afterEach(() => {
  server.resetHandlers();
  act(() => {
    store.dispatch(productApi.util.resetApiState());
    store.dispatch(productsApi.util.resetApiState());
    store.dispatch(authApi.util.resetApiState());
    store.dispatch(searchProductApi.util.resetApiState());
  });
});

// Clean up after the tests are finished.
afterAll(() => server.close());
