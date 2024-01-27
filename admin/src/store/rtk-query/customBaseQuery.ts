// @ts-nocheck
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { updateToken } from '../reducers/auth';

const BASE_URL =
  import.meta.env.VITE_BASE_API_URL || 'http://localhost:8800/api/';

const logoutSuccess = () => {
  return {
    type: 'user/logout'
  };
};

const onRefreshToken = async (dispatch) => {
  // dispatch(
  //   updateToken({
  //     accessToken: ''
  //   })
  // );
};

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const authState = getState().auth;
    const accessToken = authState?.user?.accessToken;

    if (accessToken) {
      headers.set('token', `Bearer ${accessToken}`);
    }
    return headers;
  }
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  const { dispatch, getState } = api;

  if (result.error && result.error.status === 401) {
    // dispatch(logoutSuccess());
    await onRefreshToken(dispatch);
  }
  return result;
};
