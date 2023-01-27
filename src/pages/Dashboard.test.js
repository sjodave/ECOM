import { render, screen } from "../../test-utils";
import { render as renderFromRTL } from "@testing-library/react";
import Dashboard from "./Dashboard.page";
import { server } from "../mocks/server";
import { rest } from "msw";
import { productsList } from "../mocks/mockData";
import userEvent from "@testing-library/user-event";
import { act } from "react-test-renderer";
import Cart from "./Cart.page";
const user = userEvent.setup();

describe("Product D", () => {
  test("renders data", async () => {
    render(<Dashboard />);
    const textElement = await screen.findByText(/iPhone 9/i);
    expect(textElement).toBeInTheDocument();
  });

  test("display list items", async () => {
    const length = productsList.products.length;
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

describe("Sort By Dropdown", () => {
  test("should correctly set default option", async () => {
    render(<Dashboard data={productsList} />);

    const combobox = await screen.findByRole("combobox");
    expect(combobox).toBeInTheDocument();

    await user.selectOptions(screen.getByRole("combobox"), [
      "Price low to high",
    ]);
    expect(
      screen.getByRole("option", { name: "Price low to high" }).selected
    ).toBe(true);
  });
});

// describe("Add to cartlist", () => {
//   test("carrectly add item to cartlist", async () => {
//     render(<Dashboard />);
//     // render(<Cart />);
//     // const listItems = await screen.findAllByRole("listitem");
//     // expect(listItems).toHaveLength(3);
//     const addToCartButton = await screen.findAllByRole("button", {
//       name: /add to cart/i,
//     });
//     await user.click(addToCartButton[0]);
//     render(<Cart />);
//     const updatedListItems = await screen.findByText(/my cart(1)/i);
//     expect(updatedListItems).toBeInTheDocument();
//     // expect(1).toBe(1);
//   });
// });
