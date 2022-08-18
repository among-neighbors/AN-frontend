import { Button } from '@mui/material';

const HelpFinBox = () => {
  return (
    <>
      <div className='helpFinBox'>
        <h5>103동 1401호의 긴급 도움 요청이 해결되었습니다.</h5>
        <p>22년 7월 24일 17:30</p>
      </div>
      <style jsx>{`
        .helpFinBox {
          display: flex;
          flex-direction: column;
          justify-content: center;
          width: 100%;
          height: 60px;
          outline: solid #ddd;
          outline-width: 0.5px;
          color: #000;
          gap: 5px;
          padding-left: 10px;
        }
        .helpFinBox > h5 {
          font-size: 13px;
          font-weight: 500;
        }
        .helpFinBox > p {
          font-size: 12px;
          color: #999;
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
            <Button
              color='inherit'
              sx={{ color: '#000', width: '88px', height: '26px' }}
              variant='outlined'
            >
              거절
            </Button>
            <Button color='success' sx={{ width: '160px', height: '30px' }} variant='contained'>
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
          justify-content: center;
          width: 100%;
          height: 100%;
          border-radius: 4px;
          gap: 8px;
          box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
        }
        .helpCallBox > p {
          display: flex;
          justify-content: center;
          font-size: 1.05em;
        }
        .helpCallBoxBtns {
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
      `}</style>
    </>
  );
};

export { HelpCallBox, HelpFinBox };
