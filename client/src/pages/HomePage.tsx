import styled from 'styled-components';
import MainLink from '~/components/organisms/MainLink';
import notice from '../../public/img/noticeIcon.svg';
import community from '../../public/img/communityIcon.svg';
import complaint from '../../public/img/complaintIcon.svg';
import { Box, Typography } from '@mui/material';
import MyMap from '~/components/organisms/MyMap';

//이미지와 텍스트를 감싸고 있는 요소
const StyledContainer = styled.div`
  position: relative;
  height: 80%;
`;
// 텍스트를 감싸고 있는 요소
const StyledContainerText = styled.div`
  text-align: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  justify-contents: center;
  width: 100%;
  height: 90%;
  position: absolute;
  top: 0;
  color: black;
  font-weight: bold;
  font-family: BlinkMacSystemFont;
`;

const StyledContainerBtn = styled.div`
  width: 52%;
  height: 70%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: 'space-between';
  -ms-flex-pack: 'space-between';
  justify-content: 'space-between';
  color: black;
  margin: 5% 0 0 0;
  position: absolute;
  font-family: BlinkMacSystemFont;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;
const StyledContainerBtn2 = styled.div`
  width: 80%;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  justify-items: center;

  -webkit-box-pack: 'space-between';

  -ms-flex-pack: 'space-between';

  justify-content: 'space-between';
  color: black;
  margin: 5% 0 0 0;
  position: absolute;
  font-family: BlinkMacSystemFont;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;
const StyledContainerBtn3 = styled.div`
  width: 90%;
  height: 90%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  justify-items: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: 'space-between';
  -ms-flex-pack: 'space-between';
  justify-content: 'space-between';
  color: black;
  margin: 5% 0 0 0;
  position: absolute;
  font-family: BlinkMacSystemFont;
  top: 55%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
`;

const HomePage = () => {
  return (
    <StyledHome>
      <MyMap />
      <StyledContainer>
        <StyledImage src='../../public/img/homeMain.svg' />

        <StyledContainerText>
          <Typography
            sx={{ display: { xs: 'none', md: 'block' }, fontSize: '30px', fontWeight: 700 }}
          >
            작은 관심으로 따뜻한 이웃 사이를 만드는 서비스, 오늘도 이웃사이 하세요
          </Typography>
          <Typography
            variant='h5'
            noWrap
            sx={{
              display: { xs: 'block', sm: 'none', md: 'none' },
              margin: '2px',
              fontSize: '14px',
              fontFamily: 'monospace',
              fontWeight: 600,
            }}
          >
            작은 관심으로 따뜻한 이웃 사이를 만드는 서비스,
          </Typography>
          <Typography
            variant='h5'
            noWrap
            sx={{
              display: { xs: 'block', sm: 'none', md: 'none' },
              fontSize: '16px',
              fontFamily: 'monospace',

              fontWeight: 600,
            }}
          >
            오늘도 이웃사이 하세요
          </Typography>
          <Typography
            variant='h5'
            noWrap
            sx={{
              display: { xs: 'none', sm: 'block', md: 'none' },
              margin: '5px',
              fontSize: '23px',
              fontFamily: 'monospace',
              fontWeight: 600,
            }}
          >
            작은 관심으로 따뜻한 이웃 사이를 만드는 서비스,
          </Typography>
          <Typography
            variant='h5'
            noWrap
            sx={{
              display: { xs: 'none', sm: 'block', md: 'none' },
              fontSize: '23px',
              fontFamily: 'monospace',
              fontWeight: 600,
            }}
          >
            오늘도 이웃사이 하세요
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
            <StyledContainerBtn>
              {linkData.map(({ buttonText, src, nav }, index) => {
                return <MainLink buttonText={buttonText} nav={nav} src={src} key={index} />;
              })}
            </StyledContainerBtn>
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block', md: 'none' } }}>
            <StyledContainerBtn2>
              {linkData.map(({ buttonText, src, nav }, index) => {
                return <MainLink buttonText={buttonText} nav={nav} src={src} key={index} />;
              })}
            </StyledContainerBtn2>
          </Box>
          <Box sx={{ display: { xs: 'block', sm: 'none', md: 'none' } }}>
            <StyledContainerBtn3>
              {linkData.map(({ buttonText, src, nav }, index) => {
                return <MainLink buttonText={buttonText} nav={nav} src={src} key={index} />;
              })}
            </StyledContainerBtn3>
          </Box>
        </StyledContainerText>
      </StyledContainer>
    </StyledHome>
  );
};

const linkData = [
  {
    buttonText: '공지 바로가기',
    src: notice,
    nav: 'notice',
  },
  {
    buttonText: '민원 바로가기',
    src: complaint,
    nav: 'complaint',
  },
  {
    buttonText: '커뮤니티 바로가기',
    src: community,
    nav: 'community',
  },
];

const StyledHome = styled('div')`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  height: calc(100vh - 70px);
`;

export default HomePage;
