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
    }),
    myCart: builder.query({
      query: () => ({
        url: "/user/my-cart",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetMeQuery,
  useAddToWishlistMutation,
  useAddToCartMutation,
  useMyCartQuery,
} = userApi;
