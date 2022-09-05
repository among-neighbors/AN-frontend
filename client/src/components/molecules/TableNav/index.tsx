import { connect } from 'react-redux';
import { Button } from '@mui/material';
import { handleTableNav, RootState, TableNavState } from '~/others/store';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import { clickedStyleOfTableNavButton, nonClickedStyleOfTableNavButton } from './styled';
import { Obj } from '~/others/integrateInterface';
import { useLocation } from 'react-router-dom';
import { parse } from 'query-string';

interface TableNavProps {
  type: string;
  tableNavReducer: TableNavState;
  isPageMove?: boolean;
}

const TableNav: React.FC<TableNavProps> = ({ type, tableNavReducer, isPageMove = true }) => {
  if (!tableListByType[type]) return <></>;

  const location = useLocation();
  const handledQuery = (index: number): string => {
    const queryObj = Object(parse(location.search));
    queryObj['range'] = queryByType[type][index];
    queryObj['page'] = 1;
    return new URLSearchParams(queryObj).toString();
  };

  return (
    <Box sx={{ display: 'flex', margin: '10px 0 25px 0', gap: '1px' }}>
      {tableListByType[type].map((kind, index) => {
        return (
          <Button
            onClick={() => {
              handleTableNav(type === 'notice' ? true : false, index);
            }}
            component={Link}
            to={
              isPageMove
                ? `/${type}?range=${queryByType[type][index]}`
                : `/${type}?${handledQuery(index)}`
            }
            sx={
              tableNavReducer[type] === index
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

const tableListByType: Obj<string[]> = {
  notice: ['통합 공지', '라인 공지'],
  community: ['통합 게시글', '라인 게시글'],
};

const queryByType: Obj<string[]> = {
  notice: ['ALL', 'LINE'],
  community: ['ALL', 'LINE'],
};

const mapStateToProps = (state: RootState) => {
  return {
    tableNavReducer: state.tableNavReducer,
  };
};

export default connect(mapStateToProps)(TableNav);
