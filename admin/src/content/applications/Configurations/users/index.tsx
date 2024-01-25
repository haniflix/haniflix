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
import AddExamForm from './forms/AddUserForm';
import { Close, Delete, Edit } from '@mui/icons-material';
import useApiClient from 'src/hooks/useApiClient';
import { User } from '@api/client/dist/users/types';
import { useAppSelector } from 'src/store/hooks';
import { selectUser } from 'src/store/auth';
import toast from 'react-hot-toast';

function Users() {
  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const [items, setItems] = useState<User[]>([]);
  const [toEdit, setToEdit] = useState<User | null>(null);
  const [toDelete, setToDelete] = useState<User | null>(null);
  const client = useApiClient();
  const currentUser = useAppSelector(selectUser);

  const getData = useCallback(() => {
    toast.loading('loading...', { position: 'top-right' });
    client.getUsers().then((data) => {
      toast.dismiss();
      setItems(data);
    });
  }, []);

  const getItemFromId = useCallback(
    (id: number | string) => {
      return items.find((item) => item._id === id);
    },
    [items]
  );
  const deleteItem = useCallback((item) => {
    if (item == null) return;
    toast.loading('loading...', { position: 'top-right' });
    client
      .deleteUser(item._id)
      .then(() => {
        toast.dismiss();
        toast.success('deleted', { position: 'top-right' });
        getData();
        setToDelete(null);
      })
      .catch((err) => {
        toast.dismiss();
        toast.error('failed', { position: 'top-right' });
        console.error(err);
      });
  }, []);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (toEdit != null) {
      const item = getItemFromId(toEdit._id);
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
        <title>Users</title>
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
              Add user
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table /*sx={{ minWidth: 650 }}*/ aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Full name</TableCell>
                    <TableCell align="right">Email</TableCell>
                    <TableCell align="right">Is Admin</TableCell>
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
                        {row.fullname}{' '}
                        {row._id == currentUser._id ? (
                          <Chip
                            label="current user"
                            color="warning"
                            sx={{ marginLeft: 2 }}
                          />
                        ) : null}
                      </TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                      <TableCell align="right">
                        {row.isAdmin ? (
                          <Chip label="admin" color="success" />
                        ) : null}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          sx={{ p: '10px' }}
                          aria-label="menu"
                          onClick={() => setToEdit(row)}
                        >
                          <Edit />
                        </IconButton>
			{row._id !== currentUser._id ? (
                        <IconButton
                          sx={{ p: '10px' }}
                          onClick={() => setToDelete(row)}
                        >
                          <Delete />
                        </IconButton>) : null}
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
          <Box sx={{ width: 500 }}>
            <Typography
              id="modal-modal-title"
              variant="h2"
              component="h2"
              align="center"
              marginTop={3}
            >
              {toEdit ? 'Update a user' : 'Add a user'}
              <span
                style={{
                  position: 'absolute',
                  top: 10,
                  right: 5,
                  cursor: 'pointer'
                }}
                onClick={() => setOpenAddModal(false)}
              >
                <Close />
              </span>
            </Typography>
            <Box padding={5}>
              <AddExamForm
                callback={getData}
                item={toEdit ? getItemFromId(toEdit._id) : null}
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
          <DialogTitle id="alert-dialog-title">Delete user</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure to delete {toDelete?.fullname} ?
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

export default Users;
