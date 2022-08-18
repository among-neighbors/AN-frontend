import { HelpCallBox, HelpFinBox } from '../molecules/HelpCallBox';

const HelpSideBar = () => {
  return (
    <>
      <div className='helpSideBar'>
        <HelpCallBox />
        <HelpCallBox />
        <HelpCallBox />
        <HelpFinBox />
        <HelpFinBox />
        <HelpFinBox />
        <HelpFinBox />
      </div>
      <style jsx>{`
        .helpSideBar {
          position: absolute;
          top: 70px;
          right: 0;
          width: 300px;
          height: calc(100vh - 70px);
          background: #fff;
          border-left: solid 1px #ddd;
        }
      `}</style>
    </>
  );
};

export default HelpSideBar;
