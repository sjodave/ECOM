import { render } from "../../test-utils";
import { cleanup, screen } from "@testing-library/react";
import ProductDetails from "./ProductDetails.page";
import { server } from "../mocks/server";
import { rest } from "msw";
afterEach(cleanup);
describe("Product D", () => {
  test("renders data", async () => {
    render(<ProductDetails />);

    const textElement = await screen.findByRole("heading", {
      name: /Title: iPhone 9/i,
    });
    expect(textElement).toBeInTheDocument();
  });
  test("renders error", async () => {
    server.use(
      rest.get("https://dummyjson.com/products/:id", (req, res, ctx) => {
        return res(ctx.status(404));
      })
    );
    render(<ProductDetails />);
    const error = await screen.findByText("Error fetching data");
    expect(error).toBeInTheDocument();
  });
});
