import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import useInterval from 'use-interval';
import {
  accessTokenState,
  getReadyForRequestAPI,
  handleRefreshAccountAccessToken,
  handleRefreshProfileAccessToken,
  RootState,
  handlePutProfile,
} from '~/others/store';
import ProfileHome from './ProfileHome';
import { useNavigate, useLocation } from 'react-router-dom';
import myAxios from '~/others/myAxios';
import HelpCallConnectSocket from './HelpCallConnectSocket';

interface CheckerProps {
  accessTokenState: accessTokenState;
}

const Checker: React.FC<CheckerProps> = ({ accessTokenState }) => {
  const { accountAccessToken, profileAccessToken } = accessTokenState;
  const [accountKey, setAccountKey] = useState(false);
  const [profileKey, setProfileKey] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const checkAccountLogin = async () => {
    try {
      const res = await myAxios('post', 'api/v1/auth/account-token', null, true);
      handleRefreshAccountAccessToken(res.data.response.accessToken);
    } catch (err) {
      console.log(err);
    } finally {
      setAccountKey(true);
    }
  };

  const checkProfileLogin = async () => {
    try {
      const res = await myAxios('post', 'api/v1/auth/profile-token', null, true);
      handleRefreshProfileAccessToken(res.data.response.accessToken);
    } catch (err) {
      console.log(err);
      console.log(err);
    } finally {
      setProfileKey(true);
    }
  };

  const getProfile = async () => {
    const res = await myAxios('get', `api/v1/profiles/me`, null, true, profileAccessToken);
    const { id, name, lineName, houseName, imgUrl } = res.data.response;
    handlePutProfile({
      id,
      name,
      lineName,
      houseName,
      imgUrl: imgUrl ?? '',
    });
  };

  useEffect(() => {
    if (profileAccessToken === '') return;
    getProfile();
  }, [profileAccessToken]);

  useEffect(() => {
    checkAccountLogin();
    checkProfileLogin();
  }, []);

  useEffect(() => {
    if (!accountKey || !profileKey) return;
    getReadyForRequestAPI();
    if (accountAccessToken !== '' && profileAccessToken === '') {
      navigate('/');
    }
    if (accountAccessToken === '' && profileAccessToken === '') {
      const isAllowPath = allowPath.some((path) => location.pathname === path);
      if (!isAllowPath) navigate('/sign');
    }
    if (accountAccessToken !== '' && profileAccessToken !== '') {
      if (location.pathname === '/sign') navigate('/');
    }
  }, [accountKey, profileKey, accountAccessToken, profileAccessToken, location.pathname]);

  useInterval(checkAccountLogin, accountAccessToken === '' ? null : TIME_FOR_REFRESH_TOKEN);
  useInterval(checkProfileLogin, profileAccessToken === '' ? null : TIME_FOR_REFRESH_TOKEN);

  if (accountKey && profileKey && accountAccessToken !== '' && profileAccessToken === '') {
    return <ProfileHome accountAccessToken={accountAccessToken} />;
  }
  if (accountKey && profileKey && accountAccessToken !== '' && profileAccessToken !== '') {
    return <HelpCallConnectSocket />;
  }
  return <></>;
};

const allowPath = ['/', '/sign'];

const TIME_FOR_REFRESH_TOKEN = 10000;

const mapStateToProps = (state: RootState) => {
  return {
    accessTokenState: state.accessTokenReducer,
  };
};

export default connect(mapStateToProps)(Checker);
