import { baseApi } from "@/redux/baseApi";

export const wishlistAPi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addWishlist: builder.mutation({
      query: (data) => ({
        url: "/wishlist/add",
        method: "POST",
        data,
      }),
    }),
    mergeWishlist: builder.mutation({
      query: (data) => ({
        url: "/wishlist/merge",
        method: "POST",
        data,
      }),
    }),
    getLocalWishlist: builder.query({
      query: (data) => ({
        url: "/wishlist/local",
        method: "POST",
        data,
      }),
    }),
    getUserWishlist: builder.query({
      query: () => ({
        url: "/wishlist/user",
        method: "GET",
      }),
      providesTags: ["WISHLIST"],
    }),

    deleteWishlist: builder.mutation({
      query: (data) => ({
        url: "/wishlist/delete",
        method: "DELETE",
        data,
      }),
      invalidatesTags: ["WISHLIST"],
    }),
  }),
});

export const {
  useMergeWishlistMutation,
  useAddWishlistMutation,
  useLazyGetLocalWishlistQuery,
  useGetUserWishlistQuery,
  useDeleteWishlistMutation,
} = wishlistAPi;
