import { Button } from '@mui/material';
import { HelpCallBoxInner, HelpFinBoxContainer, HelpCallBoxContainer } from './styled';

const HelpFinBox: React.FC = () => {
  return (
    <HelpFinBoxContainer>
      <h5>103동 1401호의 긴급 도움 요청이 해결되었습니다.</h5>
      <p>22년 7월 24일 17:30</p>
    </HelpFinBoxContainer>
  );
};

const HelpCallBox: React.FC = () => {
  return (
    <>
      <HelpCallBoxContainer>
        <HelpCallBoxInner>
          <p>103동 1201호에서 긴급 도움 요청!</p>
          <div>
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
        </HelpCallBoxInner>
      </HelpCallBoxContainer>
    </>
  );
};

export { HelpFinBox, HelpCallBox };
