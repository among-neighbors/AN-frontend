import axios from 'axios';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import useInterval from 'use-interval';
import {
  accessTokenState,
  handleRefreshAccountAccessToken,
  handleRefreshProfileAccessToken,
  RootState,
} from '~/others/store';
import ProfileLogin from './ProfileLogin';

interface CheckerProps {
  accessTokenState: accessTokenState;
}

const checkAccountLogin = async () => {
  const res = await axios.post('https://neighbor42.com:8181/api/v1/auth/account-token', null, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });
  handleRefreshAccountAccessToken(res.data.response.accessToken);
};

const checkProfileLogin = async () => {
  const res = await axios.post('https://neighbor42.com:8181/api/v1/auth/profile-token', null, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });
  handleRefreshProfileAccessToken(res.data.response.accessToken);
};

const Checker: React.FC<CheckerProps> = ({ accessTokenState }) => {
  const { accountAccessToken, profileAccessToken } = accessTokenState;
  useEffect(() => {
    try {
      checkAccountLogin();
    } catch (err) {
      console.log(err);
    }
  }, []);
  useInterval(checkAccountLogin, accountAccessToken === '' ? null : 10000);

  useEffect(() => {
    try {
      checkProfileLogin();
    } catch (err) {
      console.log(err);
    }
  }, []);
  useInterval(checkProfileLogin, profileAccessToken === '' ? null : 10000);
  if (accountAccessToken !== '' && profileAccessToken === '')
    return <ProfileLogin token={accountAccessToken} />;
  return <></>;
};

const mapStateToProps = (state: RootState) => {
  return {
    accessTokenState: state.accessTokenReducer,
  };
};

export default connect(mapStateToProps)(Checker);
