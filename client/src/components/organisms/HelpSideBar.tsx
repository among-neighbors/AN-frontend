import { HelpCallBox, HelpFinBox } from '../molecules/HelpCallBox';

const HelpSideBar = () => {
  return (
    <>
      <div className='helpSideBar'>
        <HelpCallBox />
        <HelpCallBox />
        <HelpCallBox />
        <HelpFinBox />
      </div>
      <style jsx>{`
        .helpSideBar {
          position: absolute;
          top: 0;
          right: 0;
          width: 300px;
          height: 100vh;
          background: #fff;
        }
      `}</style>
    </>
  );
};

export default HelpSideBar;
