import { rest } from "msw";
import { productData, productsList } from "./mockData";
export const handlers = [
  rest.get("https://dummyjson.com/products", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(productsList));
  }),

  rest.get("https://dummyjson.com/products/:id", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(productData));
  }),
];
