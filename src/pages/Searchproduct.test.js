import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { screen, render } from "../../test-utils";
import App from "../App";
import { server } from "../mocks/server";
const user = userEvent.setup();
describe("SerachBar", () => {
  test("correctly search product", async () => {
    render(<App />);
    expect(await screen.findAllByRole("listitem")).toHaveLength(4);
    const SerachBar = screen.getByPlaceholderText(/search/i);
    await user.type(SerachBar, "iphone");
    expect(SerachBar).toHaveValue("iphone");

    await user.type(SerachBar, "{enter}");
    expect(SerachBar).toHaveValue("");

    expect(await screen.findByText(/iphone 9/i)).toBeInTheDocument();

    expect(await screen.findAllByRole("listitem")).toHaveLength(2);
  });

  test("if no search result found", async () => {
    server.use(
      rest.get("https://dummyjson.com/products/search", (req, res, ctx) => {
        return res(ctx.status(404), ctx.json([]));
      })
    );
    render(<App />);
    const SerachBar = screen.getByPlaceholderText(/search/i);
    await user.type(SerachBar, "iphone{enter}");

    const error = await screen.findByText(/No result found/i);
    expect(error).toBeInTheDocument();
  });
});
