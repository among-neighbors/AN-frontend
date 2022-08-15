import { connect } from 'react-redux';
import { Button } from '@mui/material';
import { handleTableNav } from '~/others/store';

const tableList = [
  {
    type: 'notice',
    navList: ['통합 공지', '단지 공지', '라인 공지'],
  },
  {
    type: 'community',
    navList: ['통합 게시글', '단지 게시글', '라인 게시글', '내 글 목록'],
  },
];

interface TableNavState {
  notice: number;
  community: number;
}

interface TableNavProps {
  type: string;
  state: TableNavState;
}

const defaultTableNav = {
  borderColor: '#BDBDBD',
  color: '#808080',
};

const TableNav = ({ type, state }: TableNavProps) => {
  const tableNav = tableList.find((table) => table.type === type);
  if (tableNav === undefined) return <></>;
  return (
    <>
      <div className='tableNav'>
        {tableNav.navList.map((kind, index) => {
          if (state[type] === index)
            return (
              <Button
                onClick={() => {
                  handleTableNav(tableNav.type === 'notice' ? true : false, index);
                }}
                sx={{
                  whiteSpace: 'nowrap',
                  height: '40px',
                  width: '105px',
                  borderRadius: '0',
                }}
                variant='contained'
                key={index}
              >
                {kind}
              </Button>
            );
          return (
            <Button
              onClick={() => {
                handleTableNav(tableNav.type === 'notice' ? true : false, index);
              }}
              sx={{
                whiteSpace: 'nowrap',
                height: '40px',
                width: '105px',
                borderRadius: '0',
                ...defaultTableNav,
              }}
              variant='outlined'
              key={index}
            >
              {kind}
            </Button>
          );
        })}
      </div>
      <style jsx>{`
        .tableNav {
          display: flex;
          margin: 10px 0 55px 0;
        }
      `}</style>
    </>
  );
};

const mapStateToProps = (state: TableNavState) => {
  return {
    state,
  };
};

export default connect(mapStateToProps)(TableNav);
