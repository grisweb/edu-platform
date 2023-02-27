import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryMeta
} from '@reduxjs/toolkit/query/react';

import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query';

import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';

import { Response } from 'interfaces/base';

import { RootState } from './store';
import { setServerConnected, setToken } from './slices/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_URL,
  prepareHeaders: (headers, { getState }) => {
    const { msToken } = (getState() as RootState).auth;
    if (msToken) {
      headers.set('authorization', `Bearer ${msToken}`);
      headers.set('X-Requested-With', 'XMLHttpRequest');
    }
  }
});

const query: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = (await baseQuery(args, api, extraOptions)) as QueryReturnValue<
    Response<unknown>,
    FetchBaseQueryError,
    FetchBaseQueryMeta
  >;

  if (result.error && result.error.status === 'FETCH_ERROR') {
    api.dispatch(setServerConnected(false));
  }

  if (result.error && result.error.status === 401) {
    api.dispatch(setToken(null));
  }

  if (result.data) {
    (result.data as unknown) = result.data.data;
  }

  return result;
};

const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: query,
  tagTypes: ['Users', 'Courses', 'Modules', 'Lectures'],
  endpoints: () => ({})
});

export default baseApi;
