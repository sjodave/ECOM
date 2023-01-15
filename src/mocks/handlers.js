import { rest } from "msw";
import { productsData } from "./products.mockData";
export const handlers = [
  rest.get("https://dummyjson.com/products/1"),
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(productsData));
  },
];
