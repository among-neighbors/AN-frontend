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
  // lineName: string;
  // houseName: string;
}

const SignUp: React.FC<SignUpProps> = ({ setIsSignUp }) => {
  const [signUpFormBaseData, setSignUpFormBaseData] = useState<SignUpFormBaseData | null>(null);

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
            <SquareImg src='../../../public/img/iconRed.png' length='50px' />
            이웃사이
          </Typography>

          {(signUpFormBaseData && (
            <SignUpForm baseData={signUpFormBaseData} setIsSignUp={setIsSignUp} />
          )) ?? <EmailForm setSignUpFormBaseData={setSignUpFormBaseData} />}
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
  setSignUpFormBaseData: React.Dispatch<React.SetStateAction<SignUpFormBaseData | null>>;
}

const EmailForm: React.FC<EmailFormProps> = ({ setSignUpFormBaseData }) => {
  const [isSendEmail, setIsSendEmail] = useState(false);

  const sendEmailCode = async (email: string) => {
    // const res =
    await myAxios('post', `api/v1/mail/code/resend`, {
      email,
    });
    // 성공시
    setIsSendEmail(true);
  };

  const checkEmailCode = async (email: string, code: string) => {
    // const res =
    await myAxios('post', `api/v1/auth/verify-code`, {
      email,
      code,
    });
    // 성공시
    setSignUpFormBaseData({ email });
  };

  const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email')?.toString() ?? '';
    const code = data.get('code')?.toString() ?? '';
    if (!data.get('code')) {
      await sendEmailCode(email);
    } else {
      await checkEmailCode(email, code);
    }
  };

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
        InputProps={{ readOnly: isSendEmail ? true : false }}
      />
      {isSendEmail && (
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
      )}
      {/* <Typography component='h5' variant='caption' color='primary'>
        관리자가 이메일 인증 요청을 보내야 회원가입이 진행됩니다.
      </Typography> */}
      <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
        인증 메일 보내기
      </Button>
    </Box>
  );
};

interface SignUpFormProps {
  baseData: SignUpFormBaseData;
  setIsSignUp: Dispatch<SetStateAction<boolean>>;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ baseData, setIsSignUp }) => {
  const handleSignUpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const joinData = {
      email: data.get('email') ?? '',
      username: data.get('username') ?? '',
      lineName: data.get('lineName') ?? '',
      houseName: data.get('houseName') ?? '',
      passwd: data.get('passwd') ?? '',
      rePasswd: data.get('rePasswd') ?? '',
    };
    const { email, username, lineName, houseName, passwd, rePasswd } = joinData;

    const passwdRegex = /(?=.*\d)(?=.*[a-z]).{8,}$/;
    if (!passwdRegex.test(passwd.toString())) return;
    if (passwd !== rePasswd) return;

    const body = {
      email,
      username,
      lineName,
      houseName,
      passwd,
    };

    try {
      // const res =
      await myAxios('post', `api/v1/auth/accounts/new`, body);
      setIsSignUp(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Box component='form' onSubmit={handleSignUpSubmit} sx={{ mt: 1 }}>
      <TextField
        margin='normal'
        required
        fullWidth
        id='email'
        label='이메일'
        name='email'
        autoComplete='email'
        defaultValue={baseData.email}
        InputProps={{ readOnly: true }}
      />
      <TextField
        margin='normal'
        required
        fullWidth
        name='username'
        label='사용자명'
        type='username'
        id='username'
        autoComplete='username'
        autoFocus
      />
      <TextField
        margin='normal'
        required
        fullWidth
        name='lineName'
        label='동'
        type='lineName'
        id='lineName'
        autoComplete='lineName'
      />
      <TextField
        margin='normal'
        required
        fullWidth
        name='houseName'
        label='호수'
        type='houseName'
        id='houseName'
        autoComplete='houseName'
      />
      <TextField
        margin='normal'
        required
        fullWidth
        name='passwd'
        label='비밀번호'
        type='password'
        id='passwd'
        autoComplete='passwd'
      />
      <TextField
        margin='normal'
        required
        fullWidth
        name='rePasswd'
        label='비밀번호'
        type='password'
        id='rePasswd'
        autoComplete='rePasswd'
      />
      {/* <Typography component='h5' variant='caption' color='primary'>
        관리자가 이메일 인증 요청을 보내야 회원가입이 진행됩니다.
      </Typography> */}
      <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
        회원가입
      </Button>
    </Box>
  );
};

export default SignUp;
