import { ThemeProvider } from '@mui/material';
import theme from './others/colorTheme';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/organisms/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignPage from './pages/SignPage';
import HomePage from './pages/HomePage';
import { Provider } from 'react-redux';
import signInStore from './others/store';
import NoticePage from './pages/NoticePage';
import ComplaintPage from './pages/ComplaintPage';
import CommunityPage from './pages/CommunityPage';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={signInStore}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/sign' element={<SignPage />} />
            <Route path='/notice' element={<NoticePage />} />
            <Route path='/complaint' element={<ComplaintPage />} />
            <Route path='/community' element={<CommunityPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
    <style jsx='true' global>{`
      html,
      body,
      #root,
      #root > div {
        height: 100%;
        width: 100%;
      }
      #root {
        display: flex;
      }
    `}</style>
  </React.StrictMode>,
);
