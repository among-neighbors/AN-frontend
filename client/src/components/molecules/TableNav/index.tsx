import { connect } from 'react-redux';
import { Button, Menu, MenuItem } from '@mui/material';
import { handleTableNav, RootState, TableNavState } from '~/others/store';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';
import { clickedStyleOfTableNavButton, nonClickedStyleOfTableNavButton } from './styled';
import { Obj } from '~/others/integrateInterface';
import { useLocation, useNavigate } from 'react-router-dom';
import { parse } from 'query-string';
import React, { useState } from 'react';

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
    queryObj['scope'] = queryByType[type][index];
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
                ? `/${type}?scope=${queryByType[type][index]}`
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
      {type === 'community' && <Category type={type} />}
    </Box>
  );
};

interface CategoryProps {
  type: string;
}

const Category: React.FC<CategoryProps> = ({ type }) => {
  const [anchorElCategory, setAnchorElCategory] = useState<null | HTMLElement>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const handledQuery = (category: string): string => {
    const queryObj = Object(parse(location.search));
    queryObj['category'] = category;
    return new URLSearchParams(queryObj).toString();
  };

  const handleOpenCategoryMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElCategory(event.currentTarget);
  };

  const handleCloseCategoryMenu = () => {
    setAnchorElCategory(null);
  };

  const navigateTo = (category: string) => {
    const search = handledQuery(category);
    navigate({ pathname: `/${type}`, search });
    handleCloseCategoryMenu();
  };

  return (
    <>
      <Button sx={nonClickedStyleOfTableNavButton} onClick={handleOpenCategoryMenu}>
        카테고리
      </Button>
      <Menu
        open={Boolean(anchorElCategory)}
        onClose={handleCloseCategoryMenu}
        anchorEl={anchorElCategory}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        {Object.entries(MenuItemsByCategory).map(([category, name]) => {
          return <MenuItem onClick={() => navigateTo(category)}>{name}</MenuItem>;
        })}
      </Menu>
    </>
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

const MenuItemsByCategory: Obj<string> = {
  ALL: '전체',
  PLAIN: '기본글',
  QNA: '질문글',
  BUYING: '삽니다',
  SELLING: '팝니다',
};

const mapStateToProps = (state: RootState) => {
  return {
    tableNavReducer: state.tableNavReducer,
  };
};

export default connect(mapStateToProps)(TableNav);
