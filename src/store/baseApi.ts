import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';

const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: (headers, { getState }) => {
      const { msToken } = (getState() as RootState).auth;
      if (msToken) {
        headers.set('authorization', `Bearer ${msToken}`);
      }
    }
  }),
  endpoints: () => ({})
});

export default baseApi;
