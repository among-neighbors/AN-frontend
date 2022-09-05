import { Box } from '@mui/system';
import { useState } from 'react';
import SignIn from '~/components/organisms/SignIn';
import SignUp from '~/components/organisms/SignUp';

const SignPage: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', height: 'calc(100vh - 70px)' }}>
      {isSignUp ? <SignUp setIsSignUp={setIsSignUp} /> : <SignIn setIsSignUp={setIsSignUp} />}
    </Box>
  );
};

export default SignPage;
