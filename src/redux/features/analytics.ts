import { baseApi } from "../baseApi";

export const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUserAnalytics: builder.query({
      query: () => ({
        url: "/analytics/user",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserAnalyticsQuery } = analyticsApi;
