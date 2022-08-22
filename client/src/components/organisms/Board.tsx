import { Box } from '@mui/system';
import BoardNav from '../molecules/BoardNav';

interface Data {
  ID: string;
  title: string;
  body: string;
  type: boolean;
  writer: string;
  date: string;
}

interface BoardProps {
  row: Data | null;
  type: String;
}

const Board = ({ row, type }: BoardProps) => {
  if (!row) return <></>;
  return (
    <>
      <Box sx={{ maxWidth: '1200px', width: '100%' }}>
        <div className='boardHeader'>
          <h2>{row.title}</h2>
          <div>
            <p>{`유형 : ${row.type ? '라인' : '단지'}`}</p>
            <p>{`작성자 : ${row.writer}`}</p>
            <p>{`등록일 : ${row.date}`}</p>
          </div>
        </div>
        <Box
          className='textBox'
          sx={{
            border: 'solid #d9d9d9',
            minHeight: '350px',
            borderWidth: '1.5px 0',
            padding: '30px 10px 50px 10px',
            marginBottom: '5px',
          }}
        >
          {row.body.split('\n').map((str) => {
            return <pre>{str}</pre>;
          })}
        </Box>
        <BoardNav type={type} />
      </Box>
      <style jsx>{`
        .boardHeader {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 80px;
          border-top: solid #666 3px;
        }
        .boardHeader > h2 {
          padding: 15px 10px;
          height: 50px;
        }
        .textBox > pre {
          line-height: 24px;
          margin-bottom: 9px;
          white-space: pre-wrap;
        }
        .boardHeader > div {
          display: flex;
          width: 100%;
          max-width: 600px;
          padding: 0 12px;
          justify-content: space-between;
        }
        .boardHeader > div > p {
          color: #666;
          font-size: 14px;
        }
      `}</style>
    </>
  );
};

export default Board;
