import { List } from '../types';
import { authApi } from './authApi';

export const listsApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminLists: builder.query({
      query: (params) => ({
        url: 'lists/admin-list',
        params
      }),
      providesTags: ['Lists']
    }),
    getMyList: builder.query({
      query: (params) => ({
        url: 'lists/my-list',
        params
      })
    }),
    createList: builder.mutation({
      query: (data: Partial<List>) => ({
        url: 'lists',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Lists']
    }),
    updateList: builder.mutation({
      query: (id: number | string, data: Partial<List>) => ({
        url: `lists/${id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: ['Lists']
    }),
    deleteList: builder.mutation({
      query: (id: number | string) => ({
        url: `lists/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Lists']
    }),
    addMovieToDefaultList: builder.mutation({
      query: (movieId: string | number) => ({
        url: 'lists/add-movie-to-default-list',
        method: 'POST',
        body: { movieId }
      })
    }),
    getRandomLists: builder.query({
      query: (type: string | undefined, genre: string | undefined) => ({
        url: 'lists',
        params: { type, genre }
      })
    })
  }),
  overrideExisting: false
});

export const {
  useGetAdminListsQuery,
  useGetMyListQuery,
  useCreateListMutation,
  useUpdateListMutation,
  useDeleteListMutation,
  useAddMovieToDefaultListMutation,
  useGetRandomListsQuery
} = listsApi;