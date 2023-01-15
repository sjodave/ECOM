import { logRoles, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../utils/store";
import Navbar from "./Navbar.component";

const content = (
  <Provider store={store}>
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  </Provider>
);
describe("Navbar", () => {
  test("renders-correctly", () => {
    const view = render(content);
    // logRoles(view.container);
    const navtoggle = screen.getByTestId("nav-toggle-icon");
    expect(navtoggle).toBeInTheDocument();

    const search = screen.getByPlaceholderText("Search");
    expect(search).toBeInTheDocument();

    const bell = screen.getByRole("img", {
      name: /profileimage/i,
    });
    expect(bell).toBeInTheDocument();

    const belltext = screen.getByTestId("bell");
    expect(belltext).toBeInTheDocument();
  });

  test("notification button renders correctly", () => {
    render(content);
    const notificationButton = screen.getByRole("button", {
      name: "View notifications",
    });
    expect(notificationButton).toBeInTheDocument();
  });
});
