import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function Copyright(props: any) {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {'Copyright © '}
      <Link color='inherit' href='https://mui.com/'>
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const SignIn = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
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
          <FormControlLabel
            control={<Checkbox value='remember' color='primary' />}
            label='Remember me'
          />
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href='#' variant='body2'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href='#' variant='body2'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
};

export default SignIn;

// import React, { useState } from 'react';
// import {
//   Avatar,
//   Button,
//   CssBaseline,
//   TextField,
//   FormControl,
//   FormControlLabel,
//   Checkbox,
//   //   FormHelperText,
//   Grid,
//   Box,
//   Typography,
//   Container,
// } from '@mui/material/';

// const SignForm = () => {
//   const [checked, setChecked] = useState<boolean>(false);

//   // 동의 체크
//   //   const handleAgree = (e) => {
//   //     setChecked(e.target.checked);
//   //   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };

//   return (
//     <Container component='main' maxWidth='xs'>
//       <CssBaseline />
//       <Box
//         sx={{
//           marginTop: 8,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//         }}
//       >
//         <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
//         <Typography component='h1' variant='h5'>
//           회원가입
//         </Typography>
//         <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
//           <FormControl component='fieldset' variant='standard'>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   autoFocus
//                   fullWidth
//                   type='email'
//                   id='email'
//                   name='email'
//                   label='이메일 주소'
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   type='password'
//                   id='password'
//                   name='password'
//                   label='비밀번호 (숫자+영문자+특수문자 8자리 이상)'
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   type='password'
//                   id='rePassword'
//                   name='rePassword'
//                   label='비밀번호 재입력'
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField required fullWidth id='name' name='name' label='이름' />
//               </Grid>
//               {/* <Grid item xs={12}>
//                 <FormControlLabel
//                   control={<Checkbox onChange={handleAgree} color='primary' />}
//                   label='회원가입 약관에 동의합니다.'
//                 />
//               </Grid> */}
//             </Grid>
//             <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }} size='large'>
//               회원가입
//             </Button>
//           </FormControl>
//         </Box>
//       </Box>
//     </Container>
//   );
// };

// export default SignForm;
