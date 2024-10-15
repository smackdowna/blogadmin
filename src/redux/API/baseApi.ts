import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = async (args, api, extraOptions) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/',
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
  tagTypes: ['user', 'blogs'],
  endpoints: () => ({}),
});
