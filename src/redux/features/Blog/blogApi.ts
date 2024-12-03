
import { baseApi } from './../../API/baseApi';

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllBlogs: builder.query({
      query: () => ({
        url: "/blog",
        method: "GET",
      }),
      providesTags: ["blogs"]
    }),

    getBlogById: builder.query({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "GET",
      }),
      providesTags: ["blogs"]
    }),

    editBlog: builder.mutation({
      query: ({ id, formData }) => {
        console.log("Editing blog with ID:", id);
        return {
          url: `/blog/${id}`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["blogs"],
    }),
    


    createBlog: builder.mutation({
      query: (formData) => ({
        url: "/blog/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["blogs"]
    }),

    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["blogs"]
    }),


  }),
});

export const { useGetAllBlogsQuery, useEditBlogMutation, useCreateBlogMutation, useDeleteBlogMutation } = blogApi;
