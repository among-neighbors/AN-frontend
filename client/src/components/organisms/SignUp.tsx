import * as React from 'react';
import { Dispatch, SetStateAction, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import SquareImg from '../atoms/Img';
import { shadowCssForMUI } from '~/others/cssLibrary';
import myAxios from '~/others/myAxios';
import { ThemeProvider } from '@mui/system';
import { signUpTheme } from '~/others/myTheme';

interface SignUpProps {
  setIsSignUp: Dispatch<SetStateAction<boolean>>;
}

interface SignUpFormBaseData {
  email: string;
  lineName: string;
  houseName: string;
}

const SignUp: React.FC<SignUpProps> = ({ setIsSignUp }) => {
  const [signUpFormBaseData, setSignUpFormBaseData] = useState<SignUpFormBaseData | null>(null);
  const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const body = {
        email: data.get('email'),
        code: data.get('code'),
      };
      console.log(body);
      setSignUpFormBaseData({
        email: 'cdt9473@gmail.com',
        lineName: '101',
        houseName: '101',
      });
      // const res = await myAxios('post', 'api/v1/auth/verify-code', body);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <ThemeProvider theme={signUpTheme}>
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
          {(signUpFormBaseData && <SignUpForm baseData={signUpFormBaseData} />) ?? (
            <EmailForm handleEmailSubmit={handleEmailSubmit} />
          )}
          <Grid container>
            <Grid item>
              <Typography
                sx={{ textDecoration: 'underline', cursor: 'pointer' }}
                component='h5'
                variant='body2'
                onClick={() => setIsSignUp(false)}
                color='primary'
              >
                계정이 있으신가요? 로그인
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

interface EmailFormProps {
  handleEmailSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const EmailForm: React.FC<EmailFormProps> = ({ handleEmailSubmit }) => {
  return (
    <Box component='form' onSubmit={handleEmailSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin='normal'
        required
        fullWidth
        id='email'
        label='이메일'
        name='email'
        autoComplete='email'
        autoFocus
      />
      <TextField
        margin='normal'
        required
        fullWidth
        name='code'
        label='인증 코드'
        type='code'
        id='code'
        autoComplete='code'
      />
      <Typography component='h5' variant='caption' color='primary'>
        관리자가 이메일 인증 요청을 보내야 회원가입이 진행됩니다.
      </Typography>
      <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
        이메일 인증
      </Button>
    </Box>
  );
};

interface SignUpFormProps {
  baseData: SignUpFormBaseData;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ baseData }) => {
  const handleSignUpSubmit = (event: React.FormEvent<HTMLFormElement>) => {};

  return (
    <Box component='form' onSubmit={handleSignUpSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin='normal'
        required
        fullWidth
        id='email'
        label='이메일'
        name='email'
        autoComplete='email'
        autoFocus
      />
      <TextField
        margin='normal'
        required
        fullWidth
        name='code'
        label='인증 코드'
        type='code'
        id='code'
        autoComplete='code'
      />
      <Typography component='h5' variant='caption' color='primary'>
        관리자가 이메일 인증 요청을 보내야 회원가입이 진행됩니다.
      </Typography>
      <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
        이메일 인증
      </Button>
    </Box>
  );
};

export default SignUp;
