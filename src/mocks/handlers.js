import { rest } from "msw";
import {
  productData,
  productsList,
  SearchIphone,
  smartphonesCategory,
} from "./mockData";
import { endpoints } from "../utils/config/endpoint.config";

export const handlers = [
  rest.get("https://dummyjson.com/products", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(productsList));
  }),
  rest.get("https://dummyjson.com/products/search", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(SearchIphone));
  }),
  rest.get("https://dummyjson.com/products/:id", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(productData));
  }),

  rest.get("https://dummyjson.com/products/category/:id", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(smartphonesCategory));
  }),

  rest.post(endpoints.auth.signin, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        email: "kminchelle@qq.com",
        firstName: "Jeanne",
        gender: "female",
        id: 15,
        image: "https://robohash.org/autquiaut.png",
        lastName: "Halvorson",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsInVzZXJuYW1lIjoia21pbmNoZWxsZSIsImVtYWlsIjoia21pbmNoZWxsZUBxcS5jb20iLCJmaXJzdE5hbWUiOiJKZWFubmUiLCJsYXN0TmFtZSI6IkhhbHZvcnNvbiIsImdlbmRlciI6ImZlbWFsZSIsImltYWdlIjoiaHR0cHM6Ly9yb2JvaGFzaC5vcmcvYXV0cXVpYXV0LnBuZyIsImlhdCI6MTY3NDIxMzUyNCwiZXhwIjoxNjc0MjE3MTI0fQ.6F31bqDIdolNi9T0zmcMMI83Y2K22UqTfiHC6LBDO6w",
        username: "kminchelle",
      })
    );
  }),
];
