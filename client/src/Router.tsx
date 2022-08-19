import { ThemeProvider } from '@mui/material';
import theme from './others/myTheme';
import Header from './components/organisms/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignPage from './pages/SignPage';
import HomePage from './pages/HomePage';
import NoticePage from './pages/NoticePage';
import ComplaintPage from './pages/ComplaintPage';
import CommunityPage from './pages/CommunityPage';
import NoticeViewPage from './pages/NoticeViewPage';
import HelpSideBar from './components/organisms/HelpSideBar';
import { connect } from 'react-redux';

const Router = (props: any) => {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme(false)}>
          <Header />
        </ThemeProvider>
        <ThemeProvider theme={theme(props.state.helpSideBarReducer)}>
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
        </ThemeProvider>
        <HelpSideBar />
      </BrowserRouter>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return { state };
};

export default connect(mapStateToProps)(Router);
