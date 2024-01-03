import { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Container,
  Grid,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
  Typography,
  Drawer,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  IconButton
} from '@mui/material';
import AddMovieForm from './forms/AddMovieForm';
import { Delete, Edit } from '@mui/icons-material';
import useApiClient from 'src/hooks/useApiClient';
import { Movie } from '@api/client/dist/movies/types';
import toast from 'react-hot-toast';

function Movies() {
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [items, setItems] = useState<Movie[]>([]);
  const [toEdit, setToEdit] = useState<Movie | null>(null);
  const [toDelete, setToDelete] = useState<Movie | null>(null);
  const client = useApiClient();

  const getData = useCallback(() => {
    toast.loading('loading...', { position: 'top-right' });
    client.getMovies().then((data) => {
      toast.dismiss();
      setItems(data);
    });
  }, []);

  const getItemFromId = useCallback(
    (id: number | string) => {
      return items.find((item) => item.id === id);
    },
    [items]
  );
  const deleteItem = useCallback((item) => {
    if (item == null) return;
    toast.loading('loading...', { position: 'top-right' });
    client
      .deleteMovie(item?._id)
      .then(() => {
        toast.dismiss();
        toast.success('deleted', { position: 'top-right' });
        setToDelete(null);
        getData();
      })
      .catch((err) => {
        toast.dismiss();
        toast.error('failed', { position: 'top-right' });
        console.error(err);
        setToDelete(null);
      });
  }, []);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (toEdit != null) {
      const item = getItemFromId(toEdit.id);
      if (item) setOpenAddModal(true);
      else setOpenAddModal(false);
    }
  }, [toEdit]);

  useEffect(() => {
    if (!openAddModal) setToEdit(null);
  }, [openAddModal]);

  return (
    <>
      <Helmet>
        <title>Tags - Configurations</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Button variant="contained" onClick={() => setOpenAddModal(true)}>
              Add movie
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell align="right">Link</TableCell>
                    <TableCell align="right">Genres</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {items.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.title}
                      </TableCell>
                      <TableCell align="right">
                        <a href={row.video} target="_blank">
                          {row.video}
                        </a>
                      </TableCell>
                      <TableCell align="right">
                        {row.genre}
                        {/*row.tags?.map((tag) => (
                          <Chip
                            key={tag.id}
                            color="primary"
                            label={tag.name}
                            sx={{ marginLeft: 1 }}
                          />
                        ))*/}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          sx={{ p: '10px' }}
                          aria-label="menu"
                          onClick={() => setToEdit(row)}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          sx={{ p: '10px' }}
                          onClick={() => setToDelete(row)}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <Drawer
          anchor="right"
          open={openAddModal}
          onClose={() => {
            setOpenAddModal(false);
          }}
        >
          <Box sx={{ maxWidth: 500 }}>
            <Typography
              id="modal-modal-title"
              variant="h2"
              component="h2"
              align="center"
              marginTop={3}
            >
              {toEdit ? 'Update a movie' : 'Add a movie'}
            </Typography>
            <Box padding={5}>
              <AddMovieForm
                callback={getData}
                item={toEdit ? getItemFromId(toEdit.id) : null}
              />
            </Box>
          </Box>
        </Drawer>

        <Dialog
          open={toDelete != null}
          onClose={() => setToDelete(null)}
          aria-labelledby="delete tag group"
          aria-describedby="Dialog displayed to confirm tag group delete"
        >
          <DialogTitle id="alert-dialog-title">Delete movie</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure to delete {toDelete?.title} ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setToDelete(null)}>Cancel</Button>
            <Button onClick={() => deleteItem(toDelete)} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </>
  );
}

export default Movies;
