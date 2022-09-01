import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SquareImg from '../atoms/Img';
import { shadowCssForMUI } from '~/others/cssLibrary';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { handleRefreshAccountAccessToken } from '~/others/store';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const res = await axios.post(
        'https://neighbor42.com:8181/api/v1/auth/accounts/login',
        {
          username: data.get('username'),
          passwd: data.get('password'),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      handleRefreshAccountAccessToken(res.data.response.accessToken);
      navigate('/');
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Container
      component='main'
      maxWidth='xs'
      sx={{
        ...shadowCssForMUI,
        paddingTop: '15px',
        paddingBottom: '20px',
      }}
    >
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          variant='h5'
          sx={{
            mr: 2,
            display: { xs: 'flex' },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.1rem',
            textDecoration: 'none',
            alignItems: 'center',
          }}
          color='primary'
        >
          <SquareImg src='../../../public/img/icon.png' length='50px' />
          이웃사이
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='username'
            label='Username'
            name='username'
            autoComplete='username'
            autoFocus
          />
          <TextField
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            로그인
          </Button>
          <Grid container>
            <Grid item>
              <Typography component='h5' variant='body2' color='primary'>
                회원가입은 관리자를 통해 가능합니다.
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;
