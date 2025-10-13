import { baseApi } from "../../baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (data) => ({
        url: "/cart/add-to-cart",
        method: "POST",
        data,
      }),
      invalidatesTags: ["CART"],
    }),
    myCart: builder.query({
      query: (data) => ({
        url: "/cart/get-cart",
        method: "POST",
        data,
      }),
      providesTags: ["CART"],
    }),
    updateCart: builder.mutation({
      query: (data) => ({
        url: "/cart/update",
        method: "POST",
        data,
      }),
      invalidatesTags: ["CART"],
    }),
    removeFromCart: builder.mutation({
      query: (data) => ({
        url: "/cart/remove",
        method: "POST",
        data,
      }),
      invalidatesTags: ["CART"],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useLazyMyCartQuery,
  useUpdateCartMutation,
  useRemoveFromCartMutation,
} = cartApi;
