import { BaseQueryApi, BaseQueryFn, createApi, DefinitionType, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery : BaseQueryFn<FetchArgs, BaseQueryApi, DefinitionType>= async (args, api, extraOptions) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: 'https://bonohomebackend.vercel.app/api/v1',
    credentials: 'include',
  });

  const result = await rawBaseQuery(args, api, extraOptions);
  
  // If an error occurs, pass it along to the component
  if (result.error) {
    // This error will be caught in the component
    return {
      error: {
        status: result.error.status,
        data: result.error.data || 'Something went wrong!',
      },
    };
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery,
  tagTypes: ['users', 'blogs'],
  endpoints: () => ({}),
});
