import { baseApi } from "../baseApi";

export const plantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPlants: builder.query({
      query: (params) => ({
        url: "/plant/all-plants",
        method: "GET",
        params,
      }),
    }),
    getSinglePlant: builder.query({
      query: ({ id }) => ({
        url: `/plant/${id}`,
        method: "GET",
      }),
    }),

    getMyWishlist: builder.query({
      query: () => ({
        url: "/plant/my-wishlist",
        method: "GET",
      }),
      providesTags: ["WISHLIST"],
    }),
    removePlantFromWishlist: builder.mutation({
      query: (data) => ({
        url: "/plant/remove-from-wishlist",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["WISHLIST"],
    }),

    //admin apis
    addPlants: builder.mutation({
      query: (data) => ({
        url: "/plant/add-plants",
        method: "POST",
        data,
      }),
    }),
  }),
});

export const {
  useGetAllPlantsQuery,
  useGetSinglePlantQuery,
  useAddPlantsMutation,
  useGetMyWishlistQuery,
  useRemovePlantFromWishlistMutation,
} = plantApi;
