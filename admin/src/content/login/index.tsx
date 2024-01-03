import {
  Box,
  Container,
  Card,
  TextField,
  Button,
  Typography
} from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { styled } from '@mui/material/styles';
import Logo from 'src/components/LogoSign';
import Hero from './Hero';
import { useEffect, useState } from 'react';
import useApiClient from 'src/hooks/useApiClient';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { selectUser, setUser } from 'src/store/auth';
import { useNavigate } from 'react-router';

const OverviewWrapper = styled(Box)(
  () => `
    overflow: auto;
    flex: 1;
    overflow-x: hidden;
    align-items: center;
`
);

// U2FsdGVkX19047kDfNolCdiD8n3NRGnah/C1vQ5t7QM=

function Overview() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const client = useApiClient();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user != null) {
      navigate('/');
    }
  }, [user]);

  const login = () => {
    const credentials = {
      email: username,
      password
    };

    client
      .login(credentials)
      .then((res) => {
        console.log(res);
        if (typeof res == 'string') {
          setError(res);
        } else {
          if (res.isAdmin) {
            dispatch(setUser(res));
          } else {
            setError('Only administrators can login here');
          }
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      });
  };

  return (
    <OverviewWrapper>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="center" py={5} alignItems="center">
          <img src="/logo.png" style={{ width: '50%' }} />
        </Box>
        <Card sx={{ p: 2, mb: 10, borderRadius: 1 }}>
          <Box
            component={'form'}
            sx={{
              '& .MuiTextField-root': { m: 1 }
            }}
          >
            {error?.length > 0 ? (
              <Typography color={'red'} align="center">
                {error}
              </Typography>
            ) : null}
            <TextField
              label="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />
            <Box marginLeft={1} marginTop={3}>
              <Button variant="contained" onClick={login}>
                Login
              </Button>
            </Box>
          </Box>
        </Card>
      </Container>
    </OverviewWrapper>
  );
}

export default Overview;
