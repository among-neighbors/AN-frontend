import { useEffect } from 'react';
import TableNav from '~/components/molecules/TableNav';
import PageHeader from '~/components/organisms/PageHeader';
import BoardTable from '~/components/organisms/Table';
import Writting from '~/components/organisms/Writting';

interface Data {
  ID: string;
  title: string;
  type: boolean;
  writer: string;
  date: string;
}

function createData(ID: string, title: string, type: boolean, writer: string, date: string): Data {
  return { ID, title, type, writer, date };
}

const rows = [
  createData('0', '해윙', true, '홍길동', '2022.08.14'),
  createData('1', '안녕하세요 제목입니다.', true, '홍길동', '2022.08.14'),
  createData('2', '안녕하세요 제목입니다.', true, '홍길동', '2022.08.14'),
  createData('3', '안녕하세요 제목입니다.', true, '홍길동', '2022.08.14'),
  createData('3033', '안녕하세요 제목입니다.', true, '홍길동', '2022.08.14'),
  createData('3033', '안녕하세요 제목입니다.', true, '홍길동', '2022.08.14'),
  createData('3033', '안녕하세요 제목입니다.', true, '홍길동', '2022.08.14'),
  createData('3033', '안녕하세요 제목입니다.', true, '홍길동', '2022.08.14'),
  createData('3033', '안녕하세요 제목입니다.', true, '홍길동', '2022.08.14'),
  createData('3033', '안녕하세요 제목입니다.', true, '홍길동', '2022.08.14'),
  createData('3033', '안녕하세요 제목입니다.', true, '홍길동', '2022.08.14'),
  createData('3033', '안녕하세요 제목입니다.', true, '홍길동', '2022.08.14'),
  createData('3033', '안녕하세요 제목입니다.', true, '홍길동', '2022.08.14'),
  createData('3033', '안녕하세요 제목입니다.', true, '홍길동', '2022.08.14'),
  createData('3033', '안녕하세요 제목입니다.', true, '홍길동', '2022.08.14'),
  createData('3033', '안녕하세요 제목입니다.', true, '홍길동', '2022.08.14'),
];

const NoticePage = () => {
  useEffect(() => {
    // API로 공지사항 데이터 싹다 끌고와
  }, []);

  return (
    <>
      <div className='noticePage'>
        <PageHeader type='notice' />
        <TableNav type='notice' />

        <Writting />

        <BoardTable labels={['공지 ID', '제목', '공지 유형', '작성자', '등록일']} rows={rows} />
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
