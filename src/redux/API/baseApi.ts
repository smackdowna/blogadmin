/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery, FetchArgs, BaseQueryFn } from '@reduxjs/toolkit/query/react';

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, any> = async (args, api, extraOptions) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/',
    credentials: 'include',
  });

  const result = await rawBaseQuery(args, api, extraOptions);
  
  // If an error occurs, pass it along to the component
  if (result.error) {
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
  tagTypes: ['user', 'blogs'],
  endpoints: () => ({}),
});
