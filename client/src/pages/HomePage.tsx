import axios from 'axios';
import { useEffect } from 'react';

const HomePage = () => {
  const test = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post('https://neighbor42.com:8181/api/v1/auth/account-token', null, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {}, []);
  return (
    <>
      <button onClick={test}>test</button>
    </>
  );
};

export default HomePage;
