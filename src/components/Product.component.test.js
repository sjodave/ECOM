import { screen, render } from "../../test-utils";
import ProductCard from "./Product.component";
import { productData } from "../mocks/mockData";
import userEvent from "@testing-library/user-event";
import { act } from "react-test-renderer";
const user = userEvent.setup();
describe("Product card", () => {
  test("renders correctly", async () => {
    render(<ProductCard product={productData} />);

    const img = await screen.findByRole("img", {
      name: /iPhone 9/i,
    });
    expect(img).toBeInTheDocument();

    const heading = await screen.findByRole("heading", {
      name: /Apple/i,
    });
    expect(heading).toBeInTheDocument();

    const title = await screen.findByText(/iPhone 9/i);
    expect(title).toBeInTheDocument();

    const mrp = await screen.findByText(/549/i);
    expect(mrp).toBeInTheDocument();

    const discountedPrice = await screen.findByText(/478/i);
    expect(discountedPrice).toBeInTheDocument();

    const discountedPercentage = await screen.findByText(/12.96% off/i);
    expect(discountedPercentage).toBeInTheDocument();

    const addToCartButton = screen.queryByRole("button", {
      name: /add to cart/i,
    });
    expect(addToCartButton).toBeInTheDocument();

    await user.click(addToCartButton);
    const removeFromCart = screen.getByRole("button", {
      name: /Remove From Cart/i,
    });
    expect(removeFromCart).toBeInTheDocument();

    // await user.click(screen.getByRole("listitem"));
    // expect(await screen.findByText(/Product Details/i)).toBeInTheDocument();
  });
});
