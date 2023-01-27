import { screen, render } from "../test-utils";
import App from "./App";
import userEvent from "@testing-library/user-event";
import { act } from "react-test-renderer";
import { server } from "./mocks/server";
import { rest } from "msw";
import { endpoints } from "./utils/config/endpoint.config";

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

describe("Add/remove item to/from cartlist", () => {
  test("carrectly add item to cartlist", async () => {
    render(<App />);
    const cartLink = screen.getByRole("link", {
      name: /cart/i,
    });
    const dashboard = screen.getByRole("link", {
      name: /dashboard/i,
    });
    await user.click(cartLink);
    const initialstate = screen.getByText(/my cart \(0 items\)/i);
    expect(initialstate).toBeInTheDocument();

    await user.click(dashboard);
    const addToCartButton = await screen.findAllByRole("button", {
      name: /add to cart/i,
    });

    await user.click(addToCartButton[0]);
    await user.click(cartLink);
    const itemAdded = screen.getByText(/my cart \(1 items\)/i);
    expect(itemAdded).toBeInTheDocument();

    const removeFromCartButton = screen.getByRole("button", {
      name: /remove/i,
    });
    await user.click(removeFromCartButton);
    expect(screen.getByText(/my cart \(0 items\)/i)).toBeInTheDocument();
  });
});

describe("Wishlist", () => {
  test("Add/remove item to/from wishlist", async () => {
    render(<App />);
    const wishlistLink = screen.getByRole("link", {
      name: /wishlist/i,
    });
    const dashboard = screen.getByRole("link", {
      name: /dashboard/i,
    });
    await user.click(wishlistLink);
    const initialstate = screen.getByText(/wishlist items: 0/i);
    expect(initialstate).toBeInTheDocument();

    await user.click(dashboard);
    const addToWishlistButton = await screen.findAllByTestId("heart");

    await user.click(addToWishlistButton[0]);
    await user.click(wishlistLink);
    const itemAdded = screen.getByText(/wishlist items: 1/i);
    expect(itemAdded).toBeInTheDocument();

    const removeFromWishlistButton = await screen.findByTestId("heart");
    await user.click(removeFromWishlistButton);
    expect(screen.getByText(/wishlist items: 0/i)).toBeInTheDocument();
  });

  test("Add items from wishlist to cart", async () => {
    render(<App />);
    const wishlistLink = screen.getByRole("link", {
      name: /wishlist/i,
    });
    const addToWishlistButton = await screen.findAllByTestId("heart");
    //add items to wishlist
    await user.click(addToWishlistButton[0]);
    await user.click(addToWishlistButton[1]);

    await user.click(wishlistLink);
    const itemAdded = screen.getByText(/wishlist items: 2/i);
    expect(itemAdded).toBeInTheDocument();

    const addToCartButton = await screen.findAllByRole("button", {
      name: /add to cart/i,
    });
    await user.click(addToCartButton[0]);
    await user.click(addToCartButton[1]);
    const cartLink = screen.getByRole("link", {
      name: /cart/i,
    });
    await user.click(cartLink);
    //check for 2 items in cart
    expect(screen.getByText(/my cart \(2 items\)/i)).toBeInTheDocument();
  });
});

describe("Cartpage Display Correct Info", () => {
  test("carrectly add item to cartlist", async () => {
    render(<App />);
    const cartLink = await screen.findByRole("link", {
      name: /cart/i,
    });

    // const addToCartButton = await screen.findAllByRole("button", {
    //   name: /add to cart/i,
    // });

    // await user.click(addToCartButton[0]);
    // await user.click(addToCartButton[1]);
    await user.click(cartLink);
    const itemAdded = screen.getByText(/my cart \(2 items\)/i);
    expect(itemAdded).toBeInTheDocument();

    expect(
      screen.getByText(/total after discount: \$1216/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/\- 232/i)).toBeInTheDocument();
    expect(screen.getByText(/1448/i)).toBeInTheDocument();
  });
});

describe("App- Sign in", () => {
  test("Input field value", async () => {
    render(<App />);
    act(() => localStorage.removeItem("jwt"));
    await user.click(screen.getByRole("link", { name: /cart/i }));
    const signinButton = screen.getByRole("button", { name: /sign in/i });
    await user.click(signinButton);
    const textElement = await screen.findByText(/iPhone 9/i);
    expect(textElement).toBeInTheDocument();
  });

  test("renders error in login", async () => {
    // const alertMock = jest.spyOn(global, "alert").mockImplementation();
    render(<App />);
    act(() => localStorage.removeItem("jwt"));
    await user.click(screen.getByRole("link", { name: /cart/i }));
    const signinButton = screen.getByRole("button", { name: /sign in/i });
    server.use(
      rest.post(endpoints.auth.signin, (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({
            message: "Invalid credentials",
          })
        );
      })
    );

    await user.click(signinButton);
    expect(
      await screen.findByRole("heading", { name: /invalid credentials/i })
    ).toBeInTheDocument();
  });
});
