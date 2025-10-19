import { baseApi } from "../baseApi";

export const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserAnalytics: builder.query({
      query: () => ({
        url: "/analytics/user",
        method: "GET",
      }),
    }),
    getPlantAnalytics: builder.query({
      query: () => ({
        url: "/analytics/plant",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserAnalyticsQuery, useGetPlantAnalyticsQuery } =
  analyticsApi;
