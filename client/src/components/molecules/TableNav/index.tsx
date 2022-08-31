import { connect } from 'react-redux';
import { Button } from '@mui/material';
import { handleTableNav, RootState } from '~/others/store';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import { clickedStyleOfTableNavButton, nonClickedStyleOfTableNavButton } from './styled';

interface TableNavProps {
  type: string;
  state: RootState;
  isPageMove?: boolean;
}

const TableNav: React.FC<TableNavProps> = ({ type, state, isPageMove = true }) => {
  const tableNav = tableList.find((table) => table.type === type);
  if (tableNav === undefined) return <></>;
  return (
    <Box sx={{ display: 'flex', margin: '10px 0 25px 0', gap: '1px' }}>
      {tableNav.navList.map((kind, index) => {
        return (
          <Button
            onClick={() => {
              handleTableNav(tableNav.type === 'notice' ? true : false, index);
            }}
            component={Link}
            to={isPageMove ? `/${type}` : ``}
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
    </Box>
  );
};

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

const mapStateToProps = (state: RootState) => {
  return {
    state,
  };
};

export default connect(mapStateToProps)(TableNav);
