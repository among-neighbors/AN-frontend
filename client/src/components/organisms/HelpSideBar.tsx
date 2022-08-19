import { Box } from '@mui/system';
import { connect } from 'react-redux';
import { closeHelpSideBar, RootState } from '~/others/store';
import { HelpCallBox, HelpFinBox } from '../molecules/HelpCallBox';

interface HelpSideBarProps {
  state: RootState;
}

const HelpSideBar = ({ state }: HelpSideBarProps) => {
  return (
    <>
      <Box
        className='hide'
        sx={{
          display: { xs: 'block', sm: 'none' },
          position: 'fixed',
          top: '70px',
          right: 0,
          width: '1000px !important',
          minWidth: '1000px',
          height: 'calc(100vh - 70px)',
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 2,
        }}
        onClick={closeHelpSideBar}
      />

      <div className='block'></div>
      <div className='helpSideBar'>
        <HelpCallBox />
        <HelpCallBox />
        <HelpCallBox />
        <HelpFinBox />
        <HelpFinBox />
        <HelpFinBox />
      </div>
      <style jsx>{`
        .block {
          width: 300px !important;
          min-width: 300px;
          height: calc(100vh - 70px);
        }
        .helpSideBar {
          position: fixed;
          top: 70px;
          right: 0;
          width: 300px !important;
          min-width: 300px;
          height: calc(100vh - 70px);
          background: #fff;
          border-left: solid 1px #ddd;
          z-index: 2;
        }
        ${state.helpSideBarReducer
          ? ``
          : `
        .block, .hide, .helpSideBar{
          display: none;
          }
        }
        `}
      `}</style>
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return { state };
};

export default connect(mapStateToProps)(HelpSideBar);
