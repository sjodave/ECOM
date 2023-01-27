import { render, screen } from "../../test-utils";
import Category from "./Category.page";
describe("Category Page", () => {
  test("renders correctly", async () => {
    render(<Category />);
    const categoryList = await screen.findAllByRole("listitem");
    expect(categoryList).toHaveLength(20);
  });
});
