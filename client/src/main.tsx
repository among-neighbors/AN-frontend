import { ThemeProvider } from '@mui/material';
import theme from './others/colorTheme';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserHeader from './components/organisms/Header';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <UserHeader />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
