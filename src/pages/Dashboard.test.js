import { render } from "../../test-utils";
import { screen } from "@testing-library/react";
import Dashboard from "./Dashboard.page";
import { server } from "../mocks/server";
import { rest } from "msw";
import { productsList } from "../mocks/mockData";

describe("Product D", () => {
  test("renders data", async () => {
    render(<Dashboard />);
    const textElement = await screen.findByRole("heading", {
      name: "iPhone 9",
    });
    expect(textElement).toBeInTheDocument();
  });

  test("display list items", async () => {
    const length = productsList.products.length;
    console.log(length);
    render(<Dashboard />);
    const listItems = await screen.findAllByRole("listitem");
    expect(listItems).toHaveLength(length);
  });

  test("renders error", async () => {
    server.use(
      rest.get("https://dummyjson.com/products", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );
    render(<Dashboard />);
    const error = await screen.findByText("Error fetching data");
    expect(error).toBeInTheDocument();
  });
});
