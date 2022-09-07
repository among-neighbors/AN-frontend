import axios from 'axios';
import { Obj } from './integrateInterface';

interface myAxiosFunc {
  (
    action: string,
    path: string,
    body?: object | null,
    withCredentials?: boolean,
    token?: string | undefined,
  ): Promise<any>;
}

interface myAxiosOption {
  headers: Obj<string>;
  withCredentials: boolean;
}

const serverURL = 'https://neighbor42.com:8181/';

const myAxios: myAxiosFunc = async (
  action,
  path,
  body = null,
  withCredentials = false,
  token = undefined,
) => {
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
    case 'put':
      return await axios.put(`${serverURL}${path}`, body, option);
    case 'delete':
      return await axios.delete(`${serverURL}${path}`, option);
    default:
      return;
  }
};

export default myAxios;
