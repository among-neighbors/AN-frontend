import axios from 'axios';

interface myAxiosProps {
  action: string;
  path: string;
  body?: object;
  withCredentials?: boolean;
  token?: string | undefined;
}

interface myAxiosOption {
  headers: {
    [key: string]: string;
  };
  withCredentials: boolean;
}

const serverURL = 'https://neighbor42.com:8181/';

const myAxios = async ({ action, path, body, withCredentials = false, token }: myAxiosProps) => {
  const option: myAxiosOption = {
    headers: { 'Content-Type': 'application/json' },
    withCredentials,
  };
  if (token) option.headers['Authorization'] = `Bearer ${token}`;

  switch (action) {
    case 'get':
      return await axios.get(`${serverURL}${path}`, option);
    case 'post':
      return await axios.post(`${serverURL}${path}`, body, option);
    default:
      return;
  }
};

export default myAxios;
