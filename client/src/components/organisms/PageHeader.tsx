import { Fragment } from 'react';

interface PageHeaderProps {
  type: string;
}

const PageHeader = ({ type }: PageHeaderProps) => {
  const texts = [
    {
      type: 'notice',
      title: '공지사항',
      sub: '반포 자이 공지사항에 오신 것을 환영합니다.',
    },
    {
      type: 'complaint',
      title: '민원',
      sub: '반포 자이 민원 처리는 여기서 도와드리겠습니다.',
    },
    {
      type: 'community',
      title: '커뮤니티',
      sub: '반포 자이 커뮤니티에 오신 것을 환영합니다.',
    },
  ];

  return (
    <>
      <div className='pageHeader'>
        {texts.map((text, index) => {
          if (text.type === type) {
            return (
              <Fragment key={index}>
                <h1>{text.title}</h1>
                <p>{text.sub}</p>
              </Fragment>
            );
          } else return <Fragment key={index} />;
        })}
      </div>
      <style jsx>{`
        .pageHeader {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 150px;
        }
        .pageHeader > h1 {
          margin: 20px;
        }
        .pageHeader > p {
          font-size: 16px;
        }
      `}</style>
    </>
  );
};

export default PageHeader;
