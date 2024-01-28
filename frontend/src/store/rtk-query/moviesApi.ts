import { authApi } from "./authApi";
import { Movie } from "../types";

export const moviesApi = authApi.injectEndpoints({
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: (params?: Pagination) => ({
        url: "movies",
        params,
      }),
      providesTags: ["Movies"],
    }),
    getRandomMovies: builder.mutation({
      query: (type: string | undefined) => ({
        url: "movies/random",
        params: type ? { type } : undefined,
      }),
    }),
    getMovie: builder.query({
      query: (id: number | string) => ({
        url: `movies/${id}`,
      }),
    }),
    createMovie: builder.mutation({
      query: (data: Partial<Movie>) => ({
        url: "movies",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Movies"],
    }),
    updateMovie: builder.mutation({
      query: (id: number | string, data: Partial<Movie>) => ({
        url: `movies/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Movies"],
    }),
    deleteMovie: builder.mutation({
      query: (id: number | string) => ({
        url: `movies/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Movies"],
    }),
    likeMovie: builder.mutation({
      query: (id: number | string) => ({
        url: `movies/${id}/like`,
        method: "POST",
      }),
    }),
    dislikeMovie: builder.mutation({
      query: (id: number | string) => ({
        url: `movies/${id}/dislike`,
        method: "POST",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMoviesQuery,
  useGetRandomMoviesMutation,
  useGetMovieQuery,
  useCreateMovieMutation,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
  useLikeMovieMutation,
  useDislikeMovieMutation,
} = moviesApi;
