import { screen, render } from "../test-utils";
import App from "./App";
import userEvent from "@testing-library/user-event";
import { act } from "react-test-renderer";

const user = userEvent.setup();
describe("Navabar", () => {
  test("navigate to cart", async () => {
    render(<App />);
    const cartLink = screen.getByRole("link", {
      name: /cart/i,
    });
    expect(cartLink).toBeInTheDocument();

    await user.click(cartLink);
    const signinPageUsernameField = screen.getByRole("textbox", {
      name: /username/i,
    });
    expect(signinPageUsernameField).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: /category/i }));
    expect(await screen.findByText(/lighting/i)).toBeInTheDocument();

    act(() => localStorage.setItem("jwt", JSON.stringify("token")));
    await user.click(cartLink);
    expect(screen.getByText(/My Cart/i)).toBeInTheDocument();
  });
});
