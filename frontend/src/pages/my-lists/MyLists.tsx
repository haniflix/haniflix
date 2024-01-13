import React, { useCallback, useEffect, useState } from "react";
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
  Chip,
} from "@mui/material";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import Navbar from "../../components/navbar/Navbar";
import List from "../../components/list/List";
import useApiClient from "../../hooks/useApiClient";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/auth";
import Swal from "sweetalert2";

const api_url = import.meta.env.VITE_APP_API_URL;
const theme = createTheme();

const useStyles = makeStyles((theme) => ({
  root: {
    overflowX: "hidden",
    maxWidth: "90%",
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
    position: "relative",
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
  const [selectedMovieTitles, setSelectedMovieTitles] = useState([]); // Store selected movie titles
  const [toEdit, setToEdit] = useState<any>(null);
  const [toDelete, setToDelete] = useState<any>(null);
  const client = useApiClient();
  const user = useAppSelector(selectUser);

  useEffect(() => {
    const storedEmail = user?.email;
    document.body.style.overflowX = "hidden";
    setUserEmail(storedEmail);
    if (storedEmail) {
      getMyLists();
    }

    fetchMovies();
  }, []);

  const getMyLists = async () => {
    client
      .getMyList()
      .then((res) => {
        setMyLists(res);
      })
      .catch((err) => {
        console.error(err);
      });
    /*try {
      const res = await axios.get(`${api_url}lists/my-list/${email}`, {
        headers: {
          token: "",
        },
      });
      setMyLists(res.data);
    } catch (err) {
      console.log(err);
    }*/
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
    setToEdit(null);
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

  useEffect(() => {
    if (toEdit) {
      setNewListTitle(toEdit.title);
      setSelectedMovies(
        movies.filter((movie) => toEdit.content.includes(movie._id))
      );
    } else {
      setNewListTitle("");
      setSelectedMovies([]);
    }
  }, [toEdit]);

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

  const updateList = useCallback(
    (id: string, content) => {
      if (toEdit) {
        const data = {
          title: newListTitle,
          content: selectedMovies.map((movie) => movie._id),
        };
        client
          .updateList(toEdit._id, data)
          .then(() => {
            getMyLists();
            fetchMovies();
            setToEdit(null);

            Swal.fire({
              title: "",
              text: "updated",
              icon: "success",
              timer: 1500,
            });
          })
          .catch((err) => {
            console.error(err);
            Swal.fire({
              title: "",
              text: "failed",
              icon: "error",
              timer: 1500,
            });
          });
      }
    },
    [toEdit, newListTitle, selectedMovies]
  );

  const deleteList = (id: string | number) => {
    client
      .deleteList(id)
      .then(() => {
        getMyLists();
        fetchMovies();
        setToDelete(null);

        Swal.fire({
          title: "",
          text: "deleted",
          icon: "success",
          timer: 1500,
        });
      })
      .then((err) => {
        console.error(err);
        Swal.fire({
          title: "",
          text: "failed",
          icon: "error",
          timer: 1500,
        });
      });
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
            //className={classes.addButton}
            className="gradientButton"
            onClick={handleOpenModal}
            startIcon={<AddIcon />}
          >
            Add New List
          </Button>
        </Paper>

        {myLists?.map((list, index) => (
          <div key={list._id}>
            <List
              key={list._id}
              list={list}
              onDelete={() => setToDelete(list)}
              onEdit={() => setToEdit(list)}
            />
          </div>
        ))}

        <Modal
          open={isModalOpen || toEdit != null}
          onClose={handleCloseModal}
          className={classes.modalContainer}
        >
          <Container>
            <Paper className={classes.modalContent}>
              <Typography variant="h6" style={{ marginBottom: 30 }}>
                {toEdit ? "Update List" : "Add New List"}
              </Typography>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleCloseModal}
                aria-label="close"
                style={{ position: "absolute", top: 0, right: 10 }}
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
                    disabled={toEdit?._id === user?.defaultList}
                    onChange={(e) => setNewListTitle(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={classes.movieSelect}>
                    <InputLabel id="select-movies">Select Movies</InputLabel>
                    <Select
                      label={"Select movies"}
                      labelId="select-movies"
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
                  {toEdit ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={updateList}
                    >
                      Update
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleAddList}
                    >
                      Confirm
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Paper>
          </Container>
        </Modal>

        <Modal
          open={toDelete != null}
          onClose={() => setToDelete(null)}
          className={classes.modalContainer}
        >
          <Container>
            <Paper className={classes.modalContent}>
              <Typography variant="h6">Delete List</Typography>
              <p style={{ marginBottom: 50 }}>
                Are you sure to delete {toDelete?.title} ?
              </p>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleCloseModal}
                aria-label="close"
                style={{ position: "absolute", top: 10, right: 10 }}
              >
                <CloseIcon />
              </IconButton>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setToDelete(null)}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => deleteList(toDelete._id)}
                  style={{ marginLeft: 10 }}
                >
                  Delete
                </Button>
              </Grid>
            </Paper>
          </Container>
        </Modal>
      </Container>
    </>
  );
};

export default MyLists;
