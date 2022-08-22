import { connect } from 'react-redux';
import { Button } from '@mui/material';
import { handleTableNav, RootState } from '~/others/store';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

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

interface TableNavProps {
  type: string;
  state: RootState;
}

const defaultStyleOfTableNavButton = {
  whiteSpace: 'nowrap',
  height: '40px',
  width: '105px',
  borderRadius: '0',
};

const clickedStyleOfTableNavButton = {
  ...defaultStyleOfTableNavButton,
  fontWeight: 700,
  outline: 'solid 1px #f6be9a',
  zIndex: 1,
};

const nonClickedStyleOfTableNavButton = {
  ...defaultStyleOfTableNavButton,
  outline: 'solid 1px #BDBDBD',
  color: '#808080',
};

const TableNav = ({ type, state }: TableNavProps) => {
  const tableNav = tableList.find((table) => table.type === type);
  const params = useParams();

  if (tableNav === undefined) return <></>;
  return (
    <>
      <div className='tableNav'>
        {tableNav.navList.map((kind, index) => {
          return (
            <Button
              onClick={() => {
                handleTableNav(tableNav.type === 'notice' ? true : false, index);
              }}
              component={Link}
              to={params.id ? `/${type}` : ``}
              sx={
                state.tableNavReducer[type] === index
                  ? clickedStyleOfTableNavButton
                  : nonClickedStyleOfTableNavButton
              }
              variant='text'
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
          margin: 10px 0 25px 0;
          gap: 1px;
        }
      `}</style>
    </>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    state,
  };
};

export default connect(mapStateToProps)(TableNav);
