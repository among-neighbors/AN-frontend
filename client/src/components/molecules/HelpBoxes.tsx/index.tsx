import { Button } from '@mui/material';
import SquareImg from '~/components/atoms/Img';
import { client } from '~/components/organisms/HelpCallConnectSocket';
import { closeHelpCallBox } from '~/others/store';
import { HelpCallBoxInner, HelpFinBoxContainer, HelpCallBoxContainer } from './styled';

interface HelpFinBoxProps {
  myHouseLine: string;
  targetHouse: string;
  acceptHouse: string;
}

interface HelpCallBoxProps {
  myHouseLine: string;
  targetHouse: string;
}

const HelpFinBox: React.FC<HelpFinBoxProps> = ({ targetHouse, acceptHouse, myHouseLine }) => {
  return (
    <HelpFinBoxContainer>
      <h5>{`${myHouseLine} ${targetHouse}의 긴급 도움 요청이 해결되었습니다.`}</h5>
      <p>{`도운 이웃 : ${acceptHouse}`}</p>
    </HelpFinBoxContainer>
  );
};

const HelpCallBox: React.FC<HelpCallBoxProps> = ({ targetHouse, myHouseLine }) => {
  const acceptHelpCall = () => {
    client.publish({
      destination: '/pub/accept',
      body: JSON.stringify({ target: targetHouse }),
    });
  };

  return (
    <>
      <HelpCallBoxContainer>
        <HelpCallBoxInner>
          <div className={'close'}>
            <button onClick={() => closeHelpCallBox(targetHouse)}>
              <SquareImg src={'../../../public/img/cancel.png'} length={'20px'} />{' '}
            </button>
          </div>
          <p>{`${myHouseLine} ${targetHouse}에서 긴급 도움 요청!`}</p>
          <div>
            <Button
              color='inherit'
              sx={{ color: '#000', width: '110px', height: '30px' }}
              variant='outlined'
              onClick={() => closeHelpCallBox(targetHouse)}
            >
              지도 보기
            </Button>
            <Button
              color='success'
              sx={{ width: '140px', height: '30px' }}
              variant='contained'
              onClick={acceptHelpCall}
            >
              수락
            </Button>
          </div>
        </HelpCallBoxInner>
      </HelpCallBoxContainer>
    </>
  );
};

export { HelpFinBox, HelpCallBox };
