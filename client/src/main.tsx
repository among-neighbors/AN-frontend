import { ThemeProvider } from '@mui/material';
import theme from './others/colorTheme';
import React from 'react';
import ReactDOM from 'react-dom/client';
import UserHeader from './components/organisms/Header';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignPage from './pages/SignPage';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <UserHeader />
        <Routes>
          <Route path='/*' element={<SignPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
