import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const categoryApi = createApi({
  reducerPath: "category",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/",
  }),
  endpoints(builder) {
    return {
      fetchCategory: builder.query({
        query: (category) => {
          return {
            url: `/products/category/${category}`,
            method: "GET",
          };
        },
      }),
    };
  },
});

export const { useFetchCategoryQuery } = categoryApi;
export { categoryApi };
