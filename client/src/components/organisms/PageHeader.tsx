import styled from 'styled-components';

interface PageHeaderProps {
  type: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ type }) => {
  const pageText = texts.find((text) => text.type === type);
  if (!pageText) return <></>;
  return (
    <StyledPageHeader>
      <h1>{pageText.title}</h1>
      <p>{pageText.sub}</p>
    </StyledPageHeader>
  );
};

const StyledPageHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 150px;
  & > h1 {
    margin: 20px;
  }
  & > p {
    font-weight: 700;
    font-size: 14px;
    line-height: 160%;
    color: #828282;
  }
`;

const texts = [
  {
    type: 'notice',
    title: '공지사항',
    sub: '공지사항에 오신 것을 환영합니다',
  },
  {
    type: 'complaint',
    title: '민원',
    sub: '민원 처리는 여기서 도와드리겠습니다',
  },
  {
    type: 'community',
    title: '커뮤니티',
    sub: '내 주변 이웃과 자유롭게 소통해봐요',
  },
];

export default PageHeader;
