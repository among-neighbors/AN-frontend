interface Data {
  ID: string;
  title: string;
  type: boolean;
  writer: string;
  date: string;
}

interface BoardProps {
  row: Data | null;
}

const Board = ({ row }: BoardProps) => {
  return (
    <>
      <div className='board'>
        <div className='boardHeader'>
          <h2>공지입니다.</h2>
          <div>
            <p>공지 유형</p>
            <p>공지 유형</p>
            <p>공지 유형</p>
          </div>
        </div>
        <pre>반갑습니다.</pre>
      </div>
      {/* <BoardNav /> */}
      <style jsx>{`
        .board {
          max-width: 1500px;
          width: 100%;
        }
        .board > pre {
          border: solid #d9d9d9;
          min-height: 350px;
          border-width: 1.5px 0;
          padding: 30px 10px 50px 10px;
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
          padding-left: 12px;
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
