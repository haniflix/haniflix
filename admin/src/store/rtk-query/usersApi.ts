import { User } from '../types';
import { authApi } from './authApi';

export const usersApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (params?: Pagination) => ({
        url: 'users',
        params
      })
    }),
    getUser: builder.query({
      query: (id: number | string) => ({
        url: `users/${id}`
      })
    }),
    createUser: builder.mutation({
      query: (data: Partial<User>) => ({
        url: 'users',
        method: 'POST',
        body: JSON.stringify(data)
      })
    }),
    updateUser: builder.mutation({
      query: (id: number | string, data: Partial<User>) => ({
        url: `users/${id}`,
        method: 'PUT',
        body: JSON.stringify(data)
      })
    }),
    deleteUser: builder.mutation({
      query: (id: number | string) => ({
        url: `users/${id}`,
        method: 'DELETE'
      })
    })
  }),
  overrideExisting: false
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation
} = usersApi;
