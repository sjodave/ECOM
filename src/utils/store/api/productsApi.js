import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productsApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/",
  }),
  endpoints(builder) {
    return {
      fetchProducts: builder.query({
        query: (skip) => {
          return {
            url: "/products",
            method: "GET",
            params: {
              skip: skip,
            },
          };
        },
      }),
    };
  },
});

export const { useFetchProductsQuery } = productsApi;
export { productsApi };
