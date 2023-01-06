import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { endpoints } from "../../config/endpoint.config";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: endpoints.auth.signin,
  }),
  endpoints(builder) {
    return {
      auth: builder.mutation({
        query: ({ username, password }) => {
          return {
            // url: "",
            body: { username: username, password: password },
            method: "POST",
          };
        },
      }),
    };
  },
});

export const { useAuthMutation } = authApi;
export { authApi };
