import styled from 'styled-components';
import MainLink from '~/components/organisms/MainLink';
import notice from '../../public/img/noticeIcon.svg';
import community from '../../public/img/communityIcon.svg';
import complaint from '../../public/img/complaintIcon.svg';
import { ReactComponent as MainImage } from '../../public/img/homeMain.svg';

//이미지와 텍스트를 감싸고 있는 요소
const StyledContainer = styled.div`
  position: relative;
`;
// 텍스트를 감싸고 있는 요소
const StyledContainerText = styled.div`
  font-size: 35px;
  width: 70%;
  height: 65%;
  position: absolute;
  top: 0;
  left: 18%;
  color: black;
  font-weight: bold;
  font-family: BlinkMacSystemFont;
`;

// 텍스트를 감싸고 있는 요소
const StyledContainerBtn = styled.div`
  width: 75%;
  height:100%;
  position: absolute;
  display: flex;
  justifyContent: 'space-between',
  bottom: 5%;
  left: 5%;
  color: black;
  margin:10% 0 0 0;
  font-family: BlinkMacSystemFont;
`;

const HomePage = () => {
  return (
    <StyledHome>
      <StyledContainer>
        <MainImage />
        <StyledContainerText>
          작은 관심으로 따뜻한 이웃 사이를 만드는 서비스, 오늘도 이웃사이 하세요
          <StyledContainerBtn>
            {linkData.map(({ buttonText, src, nav }, index) => {
              return <MainLink buttonText={buttonText} nav={nav} src={src} key={index} />;
            })}
          </StyledContainerBtn>
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
