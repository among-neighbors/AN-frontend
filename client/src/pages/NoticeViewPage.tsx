import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import PageHeader from '~/components/organisms/PageHeader';
import Board from '~/components/organisms/Board';
import Comment from '~/components/organisms/Comment';
import TableNav from '~/components/molecules/TableNav';

interface Data {
  ID: string;
  title: string;
  body: string;
  type: boolean;
  writer: string;
  date: string;
}

const NoticeViewPage = () => {
  const [row, setRow] = useState<Data | null>(null);
  const params = useParams();

  useEffect(() => {
    // console.log(window.location.href);
    // params를 통해서 그 id에 맞는 데이터를 가져와야함.
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
    <>
      <div className='noticeViewPage'>
        <PageHeader type='notice' />
        <TableNav type='notice' />
        <Board row={row} />
        <Comment />
      </div>
      <style>{`
      .noticeViewPage{
        display:flex;
        flex-direction:column;
        align-items:center;
      }
      `}</style>
    </>
  );
};

export default NoticeViewPage;
