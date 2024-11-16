
import { baseApi } from './../../API/baseApi';

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllCategories: builder.query({
      query: () => ({
        url: "/category",
        method: "GET",
      }),
      providesTags : ["categories"]
    }),

    // getCategoryById: builder.query({
    //   query: (id) => ({
    //     url: `/blog/${id}`,
    //     method: "GET",
    //   }),
    //   providesTags : ["blogs"]
    // }),
    

    createCategory: builder.mutation({
      query: (formData) => ({
        url: "/category/create",
        method: "POST",
        body: formData,
      }),
      invalidatesTags : ["categories"]
    }),

    // deleteCategory: builder.mutation({
    //   query: (id) => ({
    //     url: `/blog/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags : ["blogs"]
    // }),

  
  }),
});

export const {useCreateCategoryMutation, useGetAllCategoriesQuery } = categoryApi;
