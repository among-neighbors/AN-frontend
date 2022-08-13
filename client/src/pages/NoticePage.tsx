import { useEffect } from 'react';
import PageHeader from '~/components/organisms/PageHeader';
import StickyHeadTable from '~/components/organisms/Table';

const NoticePage = () => {
  useEffect(() => {
    // API로 공지사항 데이터 싹다 끌고와
  }, []);

  return (
    <>
      <div className='noticePage'>
        <PageHeader type='notice' />
        <StickyHeadTable />
      </div>
      <style jsx>{`
        .noticePage {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </>
  );
};

export default NoticePage;
