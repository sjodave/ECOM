import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productApi = createApi({
  reducerPath: "product",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/",
  }),
  endpoints(builder) {
    return {
      fetchProduct: builder.query({
        query: (id) => {
          return {
            url: `/products/${id}`,
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useFetchProductQuery } = productApi;
export { productApi };
