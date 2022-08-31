import { Box } from '@mui/system';
import { connect } from 'react-redux';
import { closeHelpSideBar, RootState } from '~/others/store';
import { HelpCallBox, HelpFinBox } from '../molecules/HelpBoxes.tsx';
import styled from 'styled-components';

interface HelpSideBarProps {
  isHelpSideBarOpen: boolean;
}

const HelpSideBar: React.FC<HelpSideBarProps> = ({ isHelpSideBarOpen }) => {
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

      <Block className='block'></Block>
      <StyledHelpSideBar className='helpSideBar'>
        <HelpCallBox />
        <HelpCallBox />
        <HelpCallBox />
        <HelpFinBox />
        <HelpFinBox />
        <HelpFinBox />
      </StyledHelpSideBar>
      <style jsx>{`
        ${isHelpSideBarOpen
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

interface VisibleDivProps {
  isHelpSideBarOpen: boolean;
}

const VisibleDiv = styled.div<VisibleDivProps>`
  ${(props) => (props.isHelpSideBarOpen ? '' : 'display: none;')}
`;

const Block = styled.div`
  width: 300px !important;
  min-width: 300px;
  height: calc(100vh - 70px);
`;

const StyledHelpSideBar = styled.div`
  position: fixed;
  top: 70px;
  right: 0;
  width: 300px !important;
  min-width: 300px;
  height: calc(100vh - 70px);
  background: #fff;
  border-left: solid 1px #ddd;
  z-index: 2;
`;

const mapStateToProps = (state: RootState) => {
  return { isHelpSideBarOpen: state.helpSideBarReducer };
};

export default connect(mapStateToProps)(HelpSideBar);
