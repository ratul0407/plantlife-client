import { baseApi } from "../baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (data) => ({
        url: "/order",
        method: "POST",
        data,
      }),
    }),
  }),
});

export const { usePlaceOrderMutation } = orderApi;
