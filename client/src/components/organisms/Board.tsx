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
  return (
    <>
      <div className='board'>
        <div className='boardHeader'>
          <h2>{row?.title}</h2>
          <div>
            <p>{`유형 : ${row?.type ? '라인' : '단지'}`}</p>
            <p>{`작성자 : ${row?.writer}`}</p>
            <p>{`등록일 : ${row?.date}`}</p>
          </div>
        </div>
        <pre>{row?.body}</pre>
        <BoardNav type={type} />
      </div>
      <style jsx>{`
        .board {
          max-width: 1200px;
          width: 100%;
        }
        .board > pre {
          border: solid #d9d9d9;
          min-height: 350px;
          border-width: 1.5px 0;
          padding: 30px 10px 50px 10px;
          margin-bottom: 5px;
        }
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
