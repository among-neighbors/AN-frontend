import { connect } from 'react-redux';
import { RootState } from '~/others/store';
import { HelpCallBox, HelpFinBox } from '../molecules/HelpCallBox';

interface HelpSideBarProps {
  state: RootState;
}

const HelpSideBar = ({ state }: HelpSideBarProps) => {
  return (
    <>
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
         {
          /* .helpSideBar {
          position: absolute;
          top: 70px;
          right: 0;
          width: 300px !important;
          height: calc(100vh - 70px);
          background: #fff;
          border-left: solid 1px #ddd;
        } */
        }

        ${state.helpSideBarReducer
          ? ``
          : `
        .block, .helpSideBar{
          display: none;
        }
        }
        `}
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
      `}</style>
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return { state };
};

export default connect(mapStateToProps)(HelpSideBar);
