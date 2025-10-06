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

    //admin apis
    addPlants: builder.mutation({
      query: (data) => ({
        url: "/plant/add-plants",
        method: "POST",
        data,
      }),
    }),
    getLocalCartPlants: builder.mutation({
      query: (data) => ({
        url: "/plant/get-local-cart-plants",
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
  useGetLocalCartPlantsMutation,
  useLazyGetAllPlantsQuery,
} = plantApi;
