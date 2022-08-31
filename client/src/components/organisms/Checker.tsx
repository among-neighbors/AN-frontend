import axios from 'axios';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import useInterval from 'use-interval';
import {
  accessTokenState,
  handleRefreshAccountAccessToken,
  handleRefreshProfileAccessToken,
  RootState,
} from '~/others/store';
import ProfileHome from './ProfileHome';

interface CheckerProps {
  accessTokenState: accessTokenState;
}

const Checker: React.FC<CheckerProps> = ({ accessTokenState }) => {
  const { accountAccessToken, profileAccessToken } = accessTokenState;
  const [accountKey, setAccountKey] = useState(false);
  const [profileKey, setProfileKey] = useState(false);

  const checkAccountLogin = async () => {
    try {
      const res = await axios.post('https://neighbor42.com:8181/api/v1/auth/account-token', null, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      handleRefreshAccountAccessToken(res.data.response.accessToken);
    } catch (err) {
      console.log(err);
    } finally {
      setAccountKey(true);
    }
  };

  const checkProfileLogin = async () => {
    try {
      const res = await axios.post('https://neighbor42.com:8181/api/v1/auth/profile-token', null, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      handleRefreshProfileAccessToken(res.data.response.accessToken);
    } catch (err) {
      console.log(err);
    } finally {
      setProfileKey(true);
    }
  };

  useEffect(() => {
    checkAccountLogin();
    checkProfileLogin();
  }, []);

  useInterval(checkAccountLogin, accountAccessToken === '' ? null : 10000);
  useInterval(checkProfileLogin, profileAccessToken === '' ? null : 10000);

  if (accountKey && profileKey && accountAccessToken !== '' && profileAccessToken === '')
    return <ProfileHome token={accountAccessToken} />;
  return <></>;
};

const mapStateToProps = (state: RootState) => {
  return {
    accessTokenState: state.accessTokenReducer,
  };
};

export default connect(mapStateToProps)(Checker);
