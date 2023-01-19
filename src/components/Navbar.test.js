import { render, screen } from "../../test-utils";
import Navbar from "./Navbar.component";

describe("Navbar", () => {
  test("renders-correctly", () => {
    render(<Navbar />);
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
    render(<Navbar />);
    const notificationButton = screen.getByRole("button", {
      name: "View notifications",
    });
    expect(notificationButton).toBeInTheDocument();
  });
});
