import React, { useState, useEffect } from "react";
import { TextField, Grid, Container } from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import SearchListItem from "./searchlistItem/SearchListItem";

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

const Searchresults = () => {
  const classes = useStyles();
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let isMounted = true; // Add this variable

    const getSearchMovies = async () => {
      try {
        const res = await axios.get(api_url + "movies/");

        if (isMounted) {
          // Check if the component is still mounted
          setMovies(res.data);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    if (search !== "") {
      getSearchMovies();
    } else {
      setMovies([]);
    }

    // Cleanup function to be called when the component is unmounted
    return () => {
      isMounted = false;
    };
  }, [search]);

  const handleSearch = (e) => {
    const searchString = e.target.value.trimStart().toLowerCase();
    setSearch(searchString);
  };

  const filteredMovies = movies.filter((movie) =>
    search.split(" ").every((word) => movie.title.toLowerCase().includes(word))
  );

  return (
    <Container className={classes.root}>
      <TextField
        placeholder="Search movies"
        className={classes.input}
        variant="outlined"
        onChange={handleSearch}
        InputProps={{
          style: {
            color: "black",
          },
        }}
      />

      {filteredMovies.length === 0 && search !== "" && (
        <h1 style={{ color: "black" }}>No Movies Found...</h1>
      )}

      {filteredMovies.length === 0 && search === "" && (
        <h1 style={{ color: "black" }}>Search your movies!</h1>
      )}

      <Grid container spacing={2}>
        {filteredMovies.map((movie, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <SearchListItem movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Searchresults;
