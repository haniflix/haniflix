import type { Movie } from "../movies/types";

export type List = {
  title: string;
  type: string;
  genre: string;
  content: Movie[];
  user: string;
};
