import { List } from '../types';
import { authApi } from './authApi';

export const listsApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminLists: builder.query({
      url: 'lists/admin-list'
    }),
    getMyList: builder.query({
      url: 'lists/my-list'
    }),
    createList: builder.mutation({
      query: (data: Partial<List>) => ({
        url: 'lists',
        method: 'POST',
        body: data
      })
    }),
    updateList: builder.mutation({
      query: (id: number | string, data: Partial<List>) => ({
        url: `lists/${id}`,
        method: 'PUT',
        body: data
      })
    }),
    deleteList: builder.mutation({
      query: (id: number | string) => ({
        url: `lists/${id}`,
        method: 'DELETE'
      })
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
