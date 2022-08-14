interface Data {
  ID: string;
  title: string;
  type: boolean;
  writer: string;
  date: string;
}

interface TableRowForMobileProps {
  row: Data;
}

const TableRowForMobile = ({ row }: TableRowForMobileProps) => {
  return (
    <>
      <div className='tableRow'>
        <div>{row.title}</div>
        <p>{`${row.ID} | ${row.type ? '라인' : '단지'} | ${row.writer} | ${row.date}`}</p>
      </div>
      <style jsx>{`
        .tableRow {
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 70px;
          padding-left: 10px;
          border-top: solid 1px #eee;
        }
        .tableRow > div {
          display: flex;
          align-items: center;
          height: 50px;
          color: #000;
          font-size: 16px;
        }
        .tableRow > p {
          color: #999;
          font-size: 14px;
        }
      `}</style>
    </>
  );
};

export default TableRowForMobile;
