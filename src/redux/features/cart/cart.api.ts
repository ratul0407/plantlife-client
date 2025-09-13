import { baseApi } from "../../baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (data) => ({
        url: "/user/add-to-cart",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["CART"],
    }),
    myCart: builder.query({
      query: () => ({
        url: "/user/my-cart",
        method: "GET",
      }),
      providesTags: ["CART"],
    }),
    updateCart: builder.mutation({
      query: (data) => ({
        url: "/user/update-cart",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["CART"],
    }),
    removeFromCart: builder.mutation({
      query: (data) => ({
        url: "/user/remove-from-cart",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["CART"],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useMyCartQuery,
  useUpdateCartMutation,
  useRemoveFromCartMutation,
} = cartApi;
