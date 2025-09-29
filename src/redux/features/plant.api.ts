import { baseApi } from "../baseApi";

export const plantApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPlants: builder.query({
      query: (params) => {
        const searchParams = new URLSearchParams();
        if (params?.category) {
          params.category.forEach((cat: string) => {
            searchParams.append("category", cat);
          });
        }
        return {
          url: `/plant/all-plants?${searchParams.toString()}`,
          method: "GET",
        };
      },
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
