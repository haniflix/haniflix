import React, { useState, useEffect } from "react";
import { TextField, Grid, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import SearchListItem from "./searchlistItem/SearchListItem";
import { addClassNames } from "../../store/utils/functions";
import { useGetMoviesQuery } from "../../store/rtk-query/moviesApi";
import MovieListItem from "../MovieListItem/index";

import { useLocation } from 'react-router-dom';

import {
  SearchIcon
} from '../../Assets/svgs/tsSvgs'

const api_url = import.meta.env.VITE_APP_API_URL;

import styles from './search.module.scss'

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "5vh",
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

const Searchresults = () => {
  const classes = useStyles();
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const location = useLocation();

  React.useEffect(() => {
    if (location.state.search) {
      setSearch(location.state.search)
    }
  }, [location.state])


  let queryParams = {
    searchTerm: search
  }

  const { data: moviesData, isLoading: moviesLoading, refetch, isFetching } = useGetMoviesQuery(queryParams, {
    pollingInterval: 10000,
    refetchOnMountOrArgChange: true,
  })

  const handleSearch = (e) => {
    const searchString = e.target.value.trim().toLowerCase();
    setSearch(searchString);
  };

  const filteredMovies = React.useMemo(() => {
    if (search?.trim() == '') return []

    return moviesData?.movies?.filter((movie) =>
      search.split(" ").every((word) => movie.title.toLowerCase().includes(word))
    );
  }, [search, moviesData])

  return (
    <Container className={classes.root}>
      <div className={styles["inputWrapper"]}>
        <div className=''>
          <SearchIcon className="icon" />
        </div>
        <input
          placeholder="Search movies"
          value={search}
          onChange={handleSearch}
        />
      </div>

      {filteredMovies?.length === 0 && search !== "" && (
        <h1 className='text-white'>No Movies Found...</h1>
      )}

      {/* {filteredMovies?.length === 0 && search === "" && (
        <h1 className='text-white'>Search your movies!</h1>
      )} */}

      <Grid container spacing={2} className=' !mt-3'>
        {filteredMovies?.map((movie, index) => (
          <Grid item xs={6} sm={4} md={2} lg={2} key={index}>
            <div className='relative hover:z-[200] shadow-md'>
              <MovieListItem
                movieObj={movie}
                refetchFn={refetch}
                layoutType="grid"
              />
            </div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Searchresults;
