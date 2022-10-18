import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TableNav, { Category } from '~/components/molecules/TableNav';
import PageHeader from '~/components/organisms/PageHeader';
import BoardTable from '~/components/organisms/Table';
import myAxios from '~/others/myAxios';
import { RootState } from '~/others/store';
import { useLocation } from 'react-router-dom';
import { parse } from 'query-string';
import {
  Obj,
  ProcessedTypePostDataArray,
  DeliverdTypePostDataArray,
  TableDataProps,
  isDeliveredCommunityPostDataArray,
  isDeliveredNoticePostDataArray,
} from '~/others/integrateInterface';
import { ListPageProps } from './interface';
import { APIbyType, handledDate } from '~/others/integrateVariable';

const ListPage = ({ type, accountAccessToken, isReadyForRequestAPI }: ListPageProps) => {
  const location = useLocation();
  const [tableData, setTableData] = useState<TableDataProps>({
    list: [],
    isFirstPage: false,
    isLastPage: false,
  });
  const { list, isFirstPage, isLastPage } = tableData;
  const rows = handleList(list);

  const getListData = async () => {
    const URLQueryData = parse(location.search);
    const { page, scope, category } = URLQueryData;
    const querys: Obj<string> = {
      notice: `?page=${page ?? 1}&count=10&scope=${scope ?? 'ALL'}`,
      complaint: `?page=${page ?? 1}&count=10`,
      community: `?page=${page ?? 1}&count=10&scope=${scope ?? 'ALL'}&category=${
        category ?? 'ALL'
      }`,
    };
    const res = await myAxios(
      'get',
      `${APIbyType[type]}${querys[type]}`,
      null,
      true,
      accountAccessToken,
    );
    setTableData(res.data.response);
  };

  useEffect(() => {
    if (!isReadyForRequestAPI) return;
    getListData();
  }, [isReadyForRequestAPI, location.pathname, location.search]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
      <PageHeader type={type} />
      {(type === 'notice' || type === 'community') && <TableNav type={type} isPageMove={false} />}
      {(type === 'complaint' || type === 'community') && (
        <Box
          sx={{
            width: '100%',
            height: '34px',
            display: 'flex',
            justifyContent: 'end',
            padding: '0 20px',
            gap: '25px',
          }}
        >
          {type === 'community' && <Category type={type} />}
        </Box>
      )}
      <BoardTable type={type} rows={rows} isFirstPage={isFirstPage} isLastPage={isLastPage} />
    </Box>
  );
};

const handleList = (list: DeliverdTypePostDataArray): ProcessedTypePostDataArray | null => {
  if (list.length === 0) return null;
  if (isDeliveredCommunityPostDataArray(list)) {
    return list.map(({ id, title, content, createdDate, writer, scope, category }) => {
      return {
        id,
        title,
        content,
        scope,
        category,
        writer: writer.name,
        date: handledDate(createdDate),
      };
    });
  }
  if (isDeliveredNoticePostDataArray(list)) {
    return list.map(({ id, title, content, createdDate, writer, scope }) => {
      return {
        id,
        title,
        content,
        scope,
        writer: writer.name,
        date: handledDate(createdDate),
      };
    });
  }
  return list.map(({ id, title, content, createdDate, writer }) => {
    return {
      id,
      title,
      content,
      date: handledDate(createdDate),
      writer: `${writer.lineName}동 ${writer.houseName}호`,
    };
  });
};

const mapStateToProps = (state: RootState) => {
  return {
    accountAccessToken: state.accessTokenReducer.accountAccessToken,
    isReadyForRequestAPI: state.readyForRequestAPIReducer,
  };
};

export default connect(mapStateToProps)(ListPage);
