import { ThemeProvider } from '@mui/material';
import theme from './others/myTheme';
import React from 'react';
import ReactDOM from 'react-dom/client';
import Header from './components/organisms/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignPage from './pages/SignPage';
import HomePage from './pages/HomePage';
import { Provider } from 'react-redux';
import { store } from './others/store';
import NoticePage from './pages/NoticePage';
import ComplaintPage from './pages/ComplaintPage';
import CommunityPage from './pages/CommunityPage';
import NoticeViewPage from './pages/NoticeViewPage';
import HelpSideBar from './components/organisms/HelpSideBar';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme(store.getState().helpSideBarReducer)}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/sign' element={<SignPage />} />
            <Route path='/notice' element={<NoticePage />} />
            <Route path='/notice'>
              <Route path=':id' element={<NoticeViewPage />} />
            </Route>
            <Route path='/complaint' element={<ComplaintPage />} />
            <Route path='/community' element={<CommunityPage />} />
          </Routes>
          <HelpSideBar />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
    <style jsx global>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
          'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      html,
      body,
      #root,
      #root > div {
        width: 100%;
      }
      #root {
        display: flex;
        padding-top: 70px;
      }
    `}</style>
  </React.StrictMode>,
);
