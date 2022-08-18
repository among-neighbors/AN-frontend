import { HelpCallBox, HelpFinBox } from '../molecules/HelpCallBox';

const HelpSideBar = () => {
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

export default HelpSideBar;
