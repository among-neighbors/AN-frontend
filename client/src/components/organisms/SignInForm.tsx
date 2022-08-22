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

//XU2Z
const SignIn = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // const resss = await fetch(
    //   'https://neighbor42.com:8181/api/v1/mail/re-code?email=cdt9473@gmail.com',
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   },
    // );
    // const dddd = await resss.json();
    // console.log(dddd);

    // const res = await fetch(
    //   'https://neighbor42.com:8181/api/v1/auth/verify-code?email=cdt9473@gmail.com&code=BJ6Y',
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //   },
    // );
    // const ddd = await res.json();
    // console.log(ddd);

    const res = await fetch('https://neighbor42.com:8181/api/v1/auth/account/new', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lineName: '101',
        houseName: '101',
        username: 'yoon',
        email: 'cdt9473@gmail.com',
        passwd: 'root',
      }),
    });
    const ddd = await res.json();
    console.log(ddd);

    // const ress = await fetch('https://34.64.212.250:8181/api/v1/auth/account/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   credentials: 'include',
    //   body: JSON.stringify({
    //     username: 'yoon',
    //     passwd: 'root',
    //   }),
    // });
    // const dd = await ress.json();
    // console.log(dd);

    // const ress = await fetch('http://34.64.212.250:8181/api/v1/auth/profile/add', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   credentials: 'include',
    //   body: JSON.stringify({
    //     name: 'test',
    //     age: 10,
    //     pin: '0123',
    //     gender: 'MALE',
    //   }),
    // });
    // console.log(ress);

    // const res = await fetch('34.64.212.250:8181' + '/api/v1/profile', {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
    // const r = await res.json();

    // console.log({
    //   username: data.get('username'),
    //   password: data.get('password'),
    // });
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
