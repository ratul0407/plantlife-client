import { baseApi } from "../../../redux/baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    myCart: builder.query({
      query: () => ({
        url: "/cart/my-cart",
        method: "GET",
      }),
    }),
    addToCart: builder.mutation({
      query: (data) => ({
        url: "/cart/add-to-cart",
        method: "POST",
        data,
      }),
      invalidatesTags: ["CART"],
    }),
    getCartPlants: builder.query({
      query: (data) => ({
        url: "/cart/get-cart",
        method: "POST",
        data,
      }),
      providesTags: ["CART"],
    }),
    updateCart: builder.mutation({
      query: (data) => ({
        url: "/cart/update-quantity",
        method: "POST",
        data,
      }),
      invalidatesTags: ["CART"],
    }),
    removeFromCart: builder.mutation({
      query: (data) => ({
        url: "/cart/delete-item",
        method: "DELETE",
        data,
      }),
      invalidatesTags: ["CART"],
    }),
    deleteCart: builder.mutation({
      query: () => ({
        url: "/cart/delete-cart",
        method: "DELETE",
      }),
      invalidatesTags: ["CART"],
    }),
    mergeCart: builder.mutation({
      query: (data) => ({
        url: "/cart/merge",
        method: "POST",
        data,
      }),
      invalidatesTags: ["CART"],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useLazyGetCartPlantsQuery,
  useUpdateCartMutation,
  useRemoveFromCartMutation,
  useDeleteCartMutation,
  useMergeCartMutation,
  useLazyMyCartQuery,
} = cartApi;
