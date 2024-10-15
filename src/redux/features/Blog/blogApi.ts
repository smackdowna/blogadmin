
// import { baseApi } from './../../API/baseApi';

// const blogApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({

//     getAllBlogs: builder.query({
//       query: () => ({
//         url: "/blog",
//         method: "GET",
//       }),
//     }),

//     getBlogById: builder.query({
//       query: (id) => ({
//         url: `/blog/${id}`,
//         method: "GET",
//       }),
//     }),

//     editBlog: builder.mutation({
//       query: (id) => ({
//         url: `/blog/${id}`,
//         method: "PUT",
//       }),
//     }),

//     createBlog: builder.mutation({
//       query: (userInfo) => ({
//         url: "/blog/create",
//         method: "POST",
//         body: userInfo,
//       }),
//     }),

//     deleteBlog: builder.mutation({
//       query: (id) => ({
//         url: `/blog/${id}`,
//         method: "DELETE",
//       }),
//     }),

  
//   }),
// });

// export const {useGetAllBlogsQuery, useEditBlogMutation ,useCreateBlogMutation, useDeleteBlogMutation } = blogApi;
