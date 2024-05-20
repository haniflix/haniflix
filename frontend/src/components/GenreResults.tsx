import React, { useState, useEffect } from "react";

import { makeStyles } from "@mui/styles";
import axios from "axios";
import SearchListItem from "../components/search/searchlistItem/SearchListItem";

import { addClassNames } from "../store/utils/functions";
import { useGetMoviesQuery } from "../store/rtk-query/moviesApi";

import { useParams } from "react-router-dom";
import Pagination from "./Pagination";
import { useGetGenresQuery } from "../store/rtk-query/genresApi";
import MovieListItem from "./MovieListItem/index";

import {
  TextField,
  Grid,
  Container,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";

const api_url = import.meta.env.VITE_APP_API_URL;

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "12vh",
    width: "85%",
    margin: "auto",
    color: "white",
    gap: "2",
    minHeight: "calc(100vh - 56px)",
    marginBottom: "56px",
  },
  input: {
    width: "100%",
    marginBottom: "2rem",
    "& input": {
      color: "black",
    },
  },
}));

const getCurrentYear = () => new Date().getFullYear(); // Get current year dynamically

const years = Array.from(
  { length: getCurrentYear() - 1900 + 1 },
  (_, i) => 1900 + i
).reverse(); // Generate years in descending order

const GenreResults = () => {
  const classes = useStyles();
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [movieYear, setMovieYear] = useState<undefined | number>(undefined);

  const { id: genreId } = useParams();
  const { data: genresData, isLoading: genresLoading } = useGetGenresQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const itemsPerPage = 20;
  const [page, setPage] = React.useState(1);

  let queryParams = {
    genreId,
    perPage: itemsPerPage,
    page,
    searchTerm: search,
    ...(movieYear && { movieYear }),
  };

  const {
    data: moviesData,
    isLoading: moviesLoading,
    isFetching,
      refetch,
    error,
  } = useGetMoviesQuery(queryParams, {
    pollingInterval: 10000,
    refetchOnMountOrArgChange: true,
  });

  const pageCount = moviesData?.totalMovies
    ? Math.ceil(moviesData.totalMovies / queryParams.perPage)
    : 0;

  const selectedGenre = React.useMemo(() => {
    if (!genresData) return;

    let selected = genresData?.genres?.find((item) => item?._id == genreId);
    return selected;
  }, [genresData, genreId]);

  const handlePageChange = (data) => {
    const selectedPage = parseInt(data?.selected) + 1 || 0;
    setPage(selectedPage);
  };

  const handleSearch = (e) => {
    const searchString = e.target.value.trim().toLowerCase();
    setSearch(searchString);
  };

  const handleYearChange = (e) => {
    const year = e.target?.value;
    // console.log('year ', e)
    setMovieYear(year);
  };

  return (
    <Container className={classes.root}>
      <div className="w-full flex justify-end gap-[4px]  !mt-11 sm:!mt-2">
        <TextField
          placeholder="Search movies"
          className={addClassNames(
            // classes.input,
            "bg-white h-[45px]"
          )}
          variant="outlined"
          onChange={handleSearch}
          InputProps={{
            style: {
              color: "black",
              height: 45,
            },
          }}
        />
        <FormControl>
          <InputLabel id="year-select-label">Age</InputLabel>

          <Select
            id="year-select"
            value={movieYear || ""}
            label="Year"
            onChange={handleYearChange}
            className="bg-white h-[45px] w-[90px] text-black"
            InputProps={{
              style: {
                color: "black",
                height: 45,
              },
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="text-4xl font-bold mt-11 sm:mt-2 capitalize">
        {selectedGenre?.title}
      </div>

      {moviesData?.movies?.length === 0 &&
        (search !== "" || movieYear !== undefined) && (
          <h1 className="text-white mt-6">No Movies Found...</h1>
        )}

      <Grid container spacing={2} className="!mt-3 sm:!mx-[20px] relative">
        {moviesData?.movies?.map((movie, index) => (
          <Grid item xs={6} sm={6} md={4} lg={3} key={index}>
            <div className="relative hover:z-[200] shadow-md">
              <MovieListItem
                movieObj={movie}
                refetchFn={refetch}
                layoutType="grid"
              />
            </div>
          </Grid>
        ))}
      </Grid>
      <div className={"flex items-center justify-center"}>
        <Pagination
          onPageChange={handlePageChange}
          pageCount={pageCount}
          itemsPerPage={itemsPerPage}
        />
      </div>
    </Container>
  );
};

export default GenreResults;
