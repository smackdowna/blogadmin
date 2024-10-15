import { baseApi } from "@/redux/Api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),

    signup: builder.mutation({
      query: (userInfo) => ({
        method: "POST",
        url: "/auth/signup",
        body: userInfo,
      }),
      // invalidatesTags : ["products"]
    }),

    getMe: builder.query({
      query: () => ({
        method: "GET",
        url: "/users/me",
      }),
      // invalidatesTags : ["products"]
    }),

    getAllUsers: builder.query({
      query: () => ({
        method: "GET",
        url: "/users",
      }),
      // invalidatesTags : ["products"]
    }),

    getUserById: builder.query({
      query: (userId) => ({
        method: "GET",
        url: `/users/${userId}`,
      }),
      // invalidatesTags: ["users"]
    }),

    getmyPosts: builder.query({
      query: (authorId) => ({
        method: "GET",
        url: `users/my-posts/${authorId}`,
      }),
      // invalidatesTags : ["products"]
    }),

    updateProfile: builder.mutation({
      query: (profileUpdatedData) => ({
        method: "PUT",
        url: `/users/me`,
        body: profileUpdatedData,
      }),
      invalidatesTags: ["users"]
    }),

    followUser: builder.mutation({
      query: (userId) => ({
        method: "PUT",
        url: `/users/follow/${userId}`,
      }),
      invalidatesTags: ["users"],
    }),

    unfollowUser: builder.mutation({
      query: (userId) => ({
        method: "PUT",
        url: `/users/unfollow/${userId}`,
      }),
      invalidatesTags: ["users"],
    }),
    

  }),
});

export const { useLoginMutation, useSignupMutation, useGetMeQuery, useUpdateProfileMutation, useGetmyPostsQuery, useGetUserByIdQuery, useFollowUserMutation, useUnfollowUserMutation, useGetAllUsersQuery } = authApi;
