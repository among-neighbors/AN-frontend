import { Box } from '@mui/system';
import { connect } from 'react-redux';
import { closeHelpSideBar, HelpCallState, ProfileState, RootState } from '~/others/store';
import { HelpCallBox, HelpFinBox } from '../molecules/HelpBoxes.tsx';
import styled from 'styled-components';
import { shadowCssForMUI } from '~/others/cssLibrary';
import SquareImg from '../atoms/Img';

interface HelpSideBarProps {
  isHelpSideBarOpen: boolean;
  helpCallData: HelpCallState;
  profileData: ProfileState;
}

const HelpSideBar: React.FC<HelpSideBarProps> = ({
  isHelpSideBarOpen,
  helpCallData,
  profileData,
}) => {
  return (
    <>
      <Box
        className={isHelpSideBarOpen ? '' : 'disNone'}
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

      <Block className={isHelpSideBarOpen ? '' : 'disNone'}></Block>
      <StyledHelpSideBar className={isHelpSideBarOpen ? '' : 'disNone'}>
        <div className={'closeHelpSideBar'} onClick={closeHelpSideBar}>
          <SquareImg src={'../../../public/img/back.png'} length={'40px'} />
        </div>
        {helpCallData.requests.reverse().map(({ targetHouse }, index) => {
          if (profileData.houseName === targetHouse) {
            return (
              <Box key={index} sx={{ width: '100%', height: '100%', padding: '3px 13px' }}>
                <Box
                  sx={{
                    display: 'flex',
                    ...shadowCssForMUI,
                    height: '60px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#E7602A',
                    color: '#fff',
                  }}
                >
                  도움 요청 중입니다...
                </Box>
              </Box>
            );
          }
          return (
            <HelpCallBox key={index} targetHouse={targetHouse} myHouseLine={profileData.lineName} />
          );
        })}
        {helpCallData.accepts.reverse().map(({ targetHouse, acceptHouse }, index) => {
          return (
            <HelpFinBox
              key={index}
              targetHouse={targetHouse}
              acceptHouse={acceptHouse}
              myHouseLine={profileData.lineName}
            />
          );
        })}
      </StyledHelpSideBar>
    </>
  );
};

const Block = styled.div`
  width: 300px !important;
  min-width: 300px;
  height: calc(100vh - 70px);
`;

const StyledHelpSideBar = styled.div`
  position: fixed;
  /* padding-top: 50px; */
  top: 70px;
  right: 0;
  width: 300px !important;
  min-width: 300px;
  height: calc(100vh - 70px);
  background: #fff;
  border-left: solid 1px #ddd;
  z-index: 2;
  & .closeHelpSideBar {
    width: 40px;
    height: 40px;
    filter: invert(1);
    transform: rotate(180deg);
    cursor: pointer;
  }
`;

const mapStateToProps = (state: RootState) => {
  return {
    isHelpSideBarOpen: state.helpSideBarReducer,
    helpCallData: state.helpCallReducer,
    profileData: state.profileReducer,
  };
};

export default connect(mapStateToProps)(HelpSideBar);
