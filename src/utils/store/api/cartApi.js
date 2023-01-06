import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const cartApi = createApi({
  reducerPath: "cart",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/",
  }),
  endpoints(builder) {
    return {
      fetchCart: builder.query({
        providesTags: ["cart"],
        query: (id) => {
          return {
            url: `/carts/user/${id}`,
            method: "GET",
          };
        },
      }),
      addCartItem: builder.mutation({
        invalidatesTags: ["cart"],
        query: ({ id, productsList }) => {
          return {
            url: "/carts/add",
            method: "POST",
            body: {
              userId: id,
              products: productsList,
            },
          };
        },
      }),
    };
  },
});

export const { useFetchCartQuery, useAddCartItemMutation } = cartApi;
export { cartApi };
