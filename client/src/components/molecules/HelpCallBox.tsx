import { Button } from '@mui/material';

const HelpFinBox = () => {
  return (
    <>
      <div className='helpFinBox'>
        <p>103동 1401호의 긴급 도움 요청이 해결되었습니다.</p>
        <p>22년 7월 24일 17:30</p>
      </div>
      <style jsx>{`
        .helpFinBox {
          width: 100%;
          height: 60px;
          border: solid #ddd;
          border-width: 1px 0;
          color: #000;
        }
        .helpFinBox > p {
          font-size: 14px;
        }
      `}</style>
    </>
  );
};

const HelpCallBox = () => {
  return (
    <>
      <div className='helpCallBoxContainer'>
        <div className='helpCallBox'>
          <p>103동 1201호에서 긴급 도움 요청!</p>
          <div className='helpCallBoxBtns'>
            <Button color='inherit' sx={{ display: 'block', color: '#000' }} variant='outlined'>
              거절
            </Button>
            <Button color='success' sx={{ display: 'block' }} variant='contained'>
              수락
            </Button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .helpCallBoxContainer {
          width: 100%;
          height: 100px;
          padding: 13px;
          color: #000;
        }
        .helpCallBox {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          border-radius: 4px;
          box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
        }
        .helpCallBoxBtns {
          display: flex;
        }
      `}</style>
    </>
  );
};

export { HelpCallBox, HelpFinBox };
