import { ThemeProvider } from '@mui/material';
import theme from './others/myTheme';
import Header from './components/organisms/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignPage from './pages/SignPage';
import HomePage from './pages/HomePage';
import ListPage from './pages/ListPage';
import HelpSideBar from './components/organisms/HelpSideBar';
import { connect } from 'react-redux';
import { RootState } from './others/store';
import ViewPage from './pages/ViewPage';
import WrittingPage from './pages/WrittingPage';
import { Navigate } from 'react-router-dom';

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
            <Route path='/notice' element={<ListPage type='notice' />} />
            <Route path='/notice'>
              <Route path=':id' element={<ViewPage type='notice' />} />
            </Route>
            <Route path='/complaint' element={<ListPage type='complaint' />} />
            <Route path='/complaint/writting' element={<WrittingPage type='complaint' />} />
            <Route path='/complaint'>
              <Route path=':id' element={<ViewPage type='complaint' />} />
            </Route>
            <Route path='/community' element={<ListPage type='community' />} />
            <Route path='/community/writting' element={<WrittingPage type='community' />} />
            <Route path='/community'>
              <Route path=':id' element={<ViewPage type='community' />} />
            </Route>
            <Route path='/*' element={<Navigate to='/' />}></Route>
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
