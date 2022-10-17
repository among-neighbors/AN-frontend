import styled from 'styled-components';
import MainLink from '~/components/organisms/MainLink';
import notice from '../../public/img/noticeIcon.svg';
import community from '../../public/img/communityIcon.svg';
import complaint from '../../public/img/complaintIcon.svg';
import { ReactComponent as MainImage } from '../../public/img/homeMain.svg';
import { Box, Typography } from '@mui/material';

//이미지와 텍스트를 감싸고 있는 요소
const StyledContainer = styled.div`
  position: relative;
`;
// 텍스트를 감싸고 있는 요소
const StyledContainerText = styled.div`
  text-align: center;
  align-itemx: center;
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
  height:70%;
  display: flex;
  align-items: center;
  justify-content: 'space-between',
  color: black;
  margin:5% 0 0 0;
  position: absolute;
  font-family: BlinkMacSystemFont;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const StyledContainerBtn2 = styled.div`
  width: 80%;
  height:100%;
  display: flex;
  align-items: center;
  justify-content: 'space-between',
  color: black;
  margin:5% 0 0 0;
  position: absolute;
  font-family: BlinkMacSystemFont;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const HomePage = () => {
  return (
    <StyledHome>
      <StyledContainer>
        <MainImage width='100%' />
        <StyledContainerText>
          <Typography
            sx={{ display: { xs: 'none', md: 'block' }, fontSize: '35px', fontWeight: 700 }}
          >
            작은 관심으로 따뜻한 이웃 사이를 만드는 서비스, 오늘도 이웃사이 하세요
          </Typography>
          <Typography
            variant='h5'
            noWrap
            sx={{
              display: { xs: 'block', md: 'none' },
              fontSize: '20px',
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
              display: { xs: 'block', md: 'none' },
              fontSize: '20px',
              fontFamily: 'monospace',
              fontWeight: 600,
            }}
          >
            오늘도 이웃사이 하세요
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <StyledContainerBtn>
              {linkData.map(({ buttonText, src, nav }, index) => {
                return <MainLink buttonText={buttonText} nav={nav} src={src} key={index} />;
              })}
            </StyledContainerBtn>
          </Box>
          <Box sx={{ display: { xs: 'block', md: 'none' } }}>
            <StyledContainerBtn2>
              {linkData.map(({ buttonText, src, nav }, index) => {
                return <MainLink buttonText={buttonText} nav={nav} src={src} key={index} />;
              })}
            </StyledContainerBtn2>
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
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  height: calc(100vh - 70px);
`;

export default HomePage;
