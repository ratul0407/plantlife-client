import { baseApi } from "../baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    addToWishlist: builder.mutation({
      query: (data) => ({
        url: "/user/add-to-wishlist",
        method: "PATCH",
        data,
      }),
    }),
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
  }),
});

export const {
  useGetMeQuery,
  useAddToWishlistMutation,
  useAddToCartMutation,
  useMyCartQuery,
  useUpdateCartMutation,
} = userApi;
