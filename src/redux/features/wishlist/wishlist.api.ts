import { baseApi } from "../../baseApi";
import {
  addToReduxWishlist,
  removeFromReduxWishlist,
  setReduxWishlist,
} from "./wishlistSlice";

export const wishlistApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    myWishlist: builder.query({
      query: () => ({
        url: "/user/my-wishlist",
        method: "GET",
      }),
      providesTags: ["WISHLIST"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setReduxWishlist(data?.items));
        } catch {}
      },
    }),
    removePlantFromWishlist: builder.mutation({
      query: (data) => ({
        url: "/user/remove-from-wishlist",
        method: "PATCH",
        data,
      }),
      async onQueryStarted({ plant }, { dispatch, queryFulfilled }) {
        console.log(plant);
        dispatch(removeFromReduxWishlist(plant));
        try {
          await queryFulfilled;
        } catch {
          dispatch(addToReduxWishlist(plant));
        }
      },
      invalidatesTags: ["WISHLIST"],
    }),
    addToWishlist: builder.mutation({
      query: (data) => ({
        url: "/user/add-to-wishlist",
        method: "PATCH",
        data,
      }),
      async onQueryStarted({ plant }, { dispatch, queryFulfilled }) {
        dispatch(addToReduxWishlist(plant));
        try {
          await queryFulfilled;
        } catch {
          dispatch(removeFromReduxWishlist(plant));
        }
      },
      invalidatesTags: ["WISHLIST"],
    }),
    addManyToWishlist: builder.mutation({
      query: (data) => ({
        url: "/user/add-many-to-wishlist",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["WISHLIST"],
    }),
  }),
});

export const {
  useAddToWishlistMutation,
  useMyWishlistQuery,
  useRemovePlantFromWishlistMutation,
  useAddManyToWishlistMutation,
} = wishlistApi;
