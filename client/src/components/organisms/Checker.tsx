import axios from 'axios';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { accessTokenState, RootState } from '~/others/store';

interface CheckerProps {
  accessTokenState: accessTokenState;
}

const checkAccountLogin = async () => {
  const res = await axios.post('https://neighbor42.com:8181/api/v1/auth/account-token', null, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });
  console.log(res);
  return res;
};

const checkProfileLogin = async () => {
  const res = await axios.post('https://neighbor42.com:8181/api/v1/auth/profile-token', null, {
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
  });
  return res;
};

const Checker: React.FC<CheckerProps> = ({ accessTokenState }) => {
  console.log(accessTokenState);
  useEffect(() => {
    try {
      const res = checkAccountLogin();
      console.log(res, 'HI');
    } catch (e) {
      console.log(e);
    }

    // 로그인 access token 통해서 로그인 상태 확인
  }, []);

  useEffect(() => {
    // 로그인이 되어있거나, 로그인에 성공했다면 useInterval을 통해 토큰 유지
    // => 받은 토큰은 store에 저장 후 사용
  }, []);

  useEffect(() => {
    // 프로필 로그인 access token 통해서 프로필 로그인 상태 확인
  }, []);

  return <></>;
};

const mapStateToProps = (state: RootState) => {
  return {
    accessTokenState: state.accessTokenReducer,
  };
};

export default connect(mapStateToProps)(Checker);
