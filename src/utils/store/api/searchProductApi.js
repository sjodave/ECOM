import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const searchProductApi = createApi({
  reducerPath: "searchProductApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/",
  }),
  endpoints(builder) {
    return {
      searchProduct: builder.query({
        query: (search) => {
          return {
            url: `/products/search?q=${search}`,
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useSearchProductQuery } = searchProductApi;
export { searchProductApi };
