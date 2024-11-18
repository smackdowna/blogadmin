import { baseApi } from "@/redux/API/baseApi";


const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    login: builder.mutation({
      query: (userInfo) => ({
        url: "/admin/login",
        method: "POST",
        body: userInfo,
      }),
    }),

    logout: builder.query({
      query: () => ({
        url: "/admin/logout",
        method: "GET",
      }),
    }),

    

  }),
});

export const { useLoginMutation, useLogoutQuery } = authApi;
