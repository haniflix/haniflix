import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField
} from '@mui/material';
import useApiClient from 'src/hooks/useApiClient';
import { User } from '@api/client/dist/users/types';
import toast from 'react-hot-toast';

interface AddTagGroupProps {
  callback?: Function | null;
  item?: User | null;
}

const AddUserForm: React.FC<AddTagGroupProps> = ({ callback, item }) => {
  const [fullname, setFullname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const client = useApiClient();

  const reset = () => {
    setFullname('');
    setEmail('');
    setPassword('');
    setIsAdmin(false);
  };

  const populate = (user: User) => {
    setFullname(user.fullname);
    setEmail(user.email);
    setIsAdmin(user.isAdmin);
  };

  const save = useCallback(() => {
    toast.loading('saving...', { position: 'top-right' });
    const data = {
      fullname,
      email,
      username: email,
      isAdmin,
      password
    };
    client
      .createUser(data)
      .then(() => {
        callback(data);
        reset();
        toast.dismiss();
        toast.success('saved', { position: 'top-right' });
      })
      .catch((err) => {
        console.error(err);
        toast.dismiss();
        toast.error('failed', { position: 'top-right' });
      });
  }, [fullname, email, password, isAdmin]);

  const update = useCallback(() => {
    toast.loading('saving...', { position: 'top-right' });
    const data = {
      fullname,
      email,
      username: email,
      isAdmin,
      password: undefined
    };
    if (password.length > 0) data.password = password;

    client
      .updateUser(item._id, data)
      .then(() => {
        toast.dismiss();
        toast.success('saved', { position: 'top-right' });
        callback(data);
        reset();
      })
      .catch((err) => {
        console.error(err);
        toast.dismiss();
        toast.error('failed', { position: 'top-right' });
      });
  }, [item, fullname, email, password, isAdmin]);

  useEffect(() => {
    if (item != null) {
      populate(item);
    }
  }, [item]);

  return (
    <>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1 }
        }}
      >
        <TextField
          label="Fullname"
          fullWidth
          required
          value={fullname}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFullname(event.target.value);
          }}
        />

        <TextField
          label="email"
          fullWidth
          required
          value={email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value);
          }}
        />

        <TextField
          label="password"
          type="password"
          fullWidth
          required
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
          }}
        />

        <Box marginLeft={1} marginTop={1}>
          <FormControlLabel
            label="Is Admin"
            control={
              <Checkbox
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            }
          />
        </Box>
      </Box>

      <Box marginLeft={1} marginTop={3}>
        {item ? (
          <Button variant="contained" onClick={update}>
            Update
          </Button>
        ) : (
          <Button variant="contained" onClick={save}>
            Save
          </Button>
        )}
      </Box>
    </>
  );
};

export default AddUserForm;
