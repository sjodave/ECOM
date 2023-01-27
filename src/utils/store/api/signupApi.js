import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { endpoints } from "../../config/endpoint.config";

const signupApi = createApi({
  reducerPath: "signupApi",
  baseQuery: fetchBaseQuery({
    baseUrl: endpoints.auth.signup,
  }),
  endpoints(builder) {
    return {
      signup: builder.mutation({
        query: (body) => {
          return {
            // url: "",
            body: body,
            method: "POST",
          };
        },
      }),
    };
  },
});

export const { useSignupMutation } = signupApi;
export { signupApi };
