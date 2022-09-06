import styled from 'styled-components';
import MainLink from '~/components/organisms/MainLink';
import notice from '../../public/img/notice.png';
import community from '../../public/img/community.png';
import complaint from '../../public/img/complaint.png';

const HomePage = () => {
  return (
    <StyledHome>
      {linkData.map(({ buttonText, src, nav }, index) => {
        return <MainLink buttonText={buttonText} nav={nav} src={src} key={index} />;
      })}
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
  flex-wrap: wrap;
  height: calc(100vh - 70px);
`;

export default HomePage;
