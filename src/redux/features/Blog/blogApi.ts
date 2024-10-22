
import { baseApi } from './../../API/baseApi';

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllBlogs: builder.query({
      query: () => ({
        url: "/blog",
        method: "GET",
      }),
      providesTags : ["blogs"]
    }),

    getBlogById: builder.query({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "GET",
      }),
      providesTags : ["blogs"]
    }),

    editBlog: builder.mutation({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "PUT",
      }),
      invalidatesTags : ["blogs"]
    }),

    createBlog: builder.mutation({
      query: (userInfo) => ({
        url: "/blog/create",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags : ["blogs"]
    }),

    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags : ["blogs"]
    }),

  
  }),
});

export const {useGetAllBlogsQuery, useEditBlogMutation ,useCreateBlogMutation, useDeleteBlogMutation } = blogApi;
