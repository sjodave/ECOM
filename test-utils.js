import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./src/utils/store";
import { BrowserRouter } from "react-router-dom";

const AllTheProviders = ({ children }) => {
  return (
    <Provider store={store}>
      <BrowserRouter>{children}</BrowserRouter>
    </Provider>
  );
};

const customRender = (ui, options, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return {
    ...render(ui, { wrapper: AllTheProviders, ...options }),
  };
};
// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
