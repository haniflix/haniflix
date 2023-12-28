import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Button,
  Modal,
  TextField,
  IconButton,
  makeStyles,
  Paper,
  Grid,
  Container,
  createTheme,
} from "@material-ui/core";
import {
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Stack,
  Chip
} from "@mui/material";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import Navbar from "../../components/navbar/Navbar";
import List from "../../components/list/List";

const api_url = process.env.REACT_APP_API_URL;
const theme = createTheme();

const useStyles = makeStyles((theme) => ({
  root: {
    overflowX: "hidden",
    maxWidth:"90%"
  },
  addButton: {
    marginLeft: "auto",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    backgroundColor: "#17e990",
  },
  modalContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    maxWidth: 600,
    margin: "auto",
    borderRadius: theme.spacing(2),
  },
  contentContainer: {
    marginTop: "12vh",
    padding: theme.spacing(2),
    background: "#0495ed",
    borderRadius: theme.spacing(1),
    display: "flex",
    alignItems: "center",
  },
  contentHeading: {
    marginRight: "auto",
    color: "black",
    fontWeight: "bold",
    
  },
  movieSelect: {
    width: "100%",
  },
  selectedMovies: {
    marginTop: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  chip: {
    margin: 2,
  },
}));

const MyLists = ({ type }) => {
  const classes = useStyles();
  const [myLists, setMyLists] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");
  const [movies, setMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [selectedMovieTitles,setSelectedMovieTitles] = useState([]); // Store selected movie titles

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const storedEmail = user?.email;
    document.body.style.overflowX = "hidden";
    setUserEmail(storedEmail);
    if (storedEmail) {
      getMyLists(storedEmail);
    }

    fetchMovies();
  }, []);

  const getMyLists = async (email) => {
    try {
      const res = await axios.get(`${api_url}lists/my-list/${email}`, {
        headers: {
          token: "",
        },
      });
      setMyLists(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMovies = async () => {
    try {
      const res = await axios.get(`${api_url}movies`);
      setMovies(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddList = async () => {
    try {
      const res = await axios.post(
        `${api_url}lists`,
        {
          title: newListTitle,
          email: userEmail,
          content: selectedMovies,
        },
        {
          headers: {
            token: "",
          },
        }
      );

      if (res.status === 201) {
        setMyLists([...myLists, res.data]);
      }

      setIsModalOpen(false);
      setNewListTitle("");
      setSelectedMovies([]);
      setSelectedMovieTitles([]);
      console.log(selectedMovieTitles);
    } catch (err) {
      console.log(err);
    }
  };

  const handleMovieSelection = (event) => {
    const selectedMovieIds = event.target.value;

    // Map selected movie ids to an array of objects with _id and title
    const selectedMoviesData = movies
      .filter((movie) => selectedMovieIds.includes(movie._id))
      .map((movie) => ({ _id: movie._id, title: movie.title }));

    setSelectedMovies(selectedMoviesData);

    // Get the selected movie titles
    const selectedTitles = selectedMoviesData.map((movie) => movie.title);

    setSelectedMovieTitles(selectedTitles);
  };

  

  return (
    <>
      <Navbar />
      <Container className={classes.root}>
        <Paper className={classes.contentContainer}>
          <Typography variant="h4" className={classes.contentHeading}>
            My Lists
          </Typography>

          <Button
            variant="contained"
            className={classes.addButton}
            onClick={handleOpenModal}
            startIcon={<AddIcon />}
          >
            Add New List
          </Button>
        </Paper>

        {myLists?.map((list, index) => (
          <div key={index}>
            <List key={list._id} list={list} />
          </div>
        ))}

        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          className={classes.modalContainer}
        >
          <Container>
            <Paper className={classes.modalContent}>
              <Typography variant="h6">Add New List</Typography>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleCloseModal}
                aria-label="close"
                style={{ position: "absolute", top: 10, right: 10 }}
              >
                <CloseIcon />
              </IconButton>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="List Title"
                    variant="outlined"
                    value={newListTitle}
                    onChange={(e) => setNewListTitle(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={classes.movieSelect} >
                  <InputLabel>Select Movies</InputLabel>
                    <Select
                      multiple
                      value={selectedMovies.map((movie) => movie._id)}
                      onChange={handleMovieSelection}
                      variant="outlined"
                      renderValue={(selected) => (
                        <Stack gap={1} direction="row" flexWrap="wrap">
                          {selectedMovies
                            .filter((movie) => selected.includes(movie._id))
                            .map((movie) => (
                              <Chip
                                key={movie._id}
                                label={movie.title}
                                className={classes.chip}
                              />
                            ))}
                        </Stack>
                      )}
                    >
                      {movies?.map((movie) => (
                        <MenuItem key={movie?._id} value={movie?._id}>
                          <div>
                            <img
                              src={movie?.img}
                              alt={movie?.title}
                              style={{
                                marginRight: theme.spacing(1),
                                width: "40px",
                                height: "40px",
                              }}
                            />
                            {movie?.title}
                          </div>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddList}
                  >
                    Confirm
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Container>
        </Modal>
      </Container>
    </>
  );
};

export default MyLists;
