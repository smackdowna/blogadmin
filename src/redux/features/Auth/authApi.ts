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

    

  }),
});

export const { useLoginMutation } = authApi;
