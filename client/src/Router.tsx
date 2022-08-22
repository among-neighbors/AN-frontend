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
import { RootState } from './others/store';
import ComplaintViewPage from './pages/ComplaintViewPage';
import ComplaintWrittingPage from './pages/ComplaintWrittingPage';
import CommunityViewPage from './pages/CommunityViewPage';
import CommunityWrittingPage from './pages/CommunityWrittingPage';

interface RouterProps {
  state: RootState;
}

const Router = ({ state }: RouterProps) => {
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme(false)}>
          <Header />
        </ThemeProvider>
        <ThemeProvider theme={theme(state.helpSideBarReducer)}>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/sign' element={<SignPage />} />
            <Route path='/notice' element={<NoticePage />} />
            <Route path='/notice'>
              <Route path=':id' element={<NoticeViewPage />} />
            </Route>
            <Route path='/complaint' element={<ComplaintPage />} />
            <Route path='/complaint/writting' element={<ComplaintWrittingPage />} />
            <Route path='/complaint'>
              <Route path=':id' element={<ComplaintViewPage />} />
            </Route>
            <Route path='/community' element={<CommunityPage />} />
            <Route path='/community/writting' element={<CommunityWrittingPage />} />
            <Route path='/community'>
              <Route path=':id' element={<CommunityViewPage />} />
            </Route>
          </Routes>
          <HelpSideBar />
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return { state };
};

export default connect(mapStateToProps)(Router);