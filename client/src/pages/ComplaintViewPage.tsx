import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import Board from '~/components/organisms/Board';
import Comment from '~/components/organisms/Comment';
import PageHeader from '~/components/organisms/PageHeader';

interface Data {
  ID: string;
  title: string;
  body: string;
  type: boolean;
  writer: string;
  date: string;
}

const ComplaintViewPage = () => {
  const [row, setRow] = useState<Data | null>(null);
  const type = 'complaint';
  useEffect(() => {
    function createData(
      ID: string,
      title: string,
      body: string,
      type: boolean,
      writer: string,
      date: string,
    ): Data {
      return { ID, title, body, type, writer, date };
    }

    const row = createData(
      '0',
      '해윙~ 제목입니다',
      '해윙~ 글 내용입니다.',
      true,
      '홍길동',
      '2022.08.14',
    );
    setRow(row);
  }, []);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <PageHeader type={type} />
      <Board type={type} row={row} />
      <Comment />
    </Box>
  );
};

export default ComplaintViewPage;
