import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import TableNav from '~/components/molecules/TableNav';
import PageHeader from '~/components/organisms/PageHeader';
import BoardTable from '~/components/organisms/Table';

interface Data {
  ID: string;
  title: string;
  type: boolean;
  writer: string;
  date: string;
}

interface ListPageProps {
  type: string;
}

interface stringObj {
  [key: string]: string;
}

const buttonTextByType: stringObj = {
  complaint: '민원 작성',
  community: '글쓰기',
};

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

const ListPage = ({ type }: ListPageProps) => {
  useEffect(() => {
    // API로 공지사항 데이터 싹다 끌고와
  }, []);

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
        <PageHeader type={type} />
        {type === 'notice' || type === 'community' ? (
          <TableNav type={type} isPageMove={false} />
        ) : (
          <></>
        )}
        {type === 'complaint' || type === 'community' ? (
          <Box
            sx={{ width: '100%', display: 'flex', justifyContent: 'right', paddingRight: '20px' }}
          >
            <Button component={Link} to={`/${type}/writting`} variant='contained'>
              {buttonTextByType[type]}
            </Button>
          </Box>
        ) : (
          <></>
        )}
        <BoardTable type={type} rows={rows} />
      </Box>
    </>
  );
};

export default ListPage;
