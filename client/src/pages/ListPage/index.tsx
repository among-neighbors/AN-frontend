import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import TableNav from '~/components/molecules/TableNav';
import PageHeader from '~/components/organisms/PageHeader';
import BoardTable from '~/components/organisms/Table';
import myAxios from '~/others/myAxios';
import { RootState } from '~/others/store';
import { useLocation } from 'react-router-dom';
import { parse } from 'query-string';
import {
  Obj,
  TypeDataArray,
  ListDataArray,
  TableDataProps,
  isCommunityListArrayData,
  isNoticeListArrayData,
} from '~/others/integrateInterface';
import { ListPageProps } from './interface';
import { APIbyType } from '~/others/integrateVariable';

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
    const { page, range, category } = URLQueryData;
    const querys: Obj<string> = {
      notice: `?page=${page ?? 1}&count=10&range=${range ?? 'ALL'}`,
      complaint: `?page=${page ?? 1}&count=10`,
      community: `?page=${page ?? 1}&count=10&range=${range ?? 'ALL'}&category=${
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
      {type === 'notice' || type === 'community' ? (
        <TableNav type={type} isPageMove={false} />
      ) : (
        <></>
      )}
      {type === 'complaint' || type === 'community' ? (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'right', paddingRight: '20px' }}>
          <Button component={Link} to={`/${type}/writing`} variant='contained'>
            {buttonTextByType[type]}
          </Button>
        </Box>
      ) : (
        <></>
      )}
      {rows && (
        <BoardTable type={type} rows={rows} isFirstPage={isFirstPage} isLastPage={isLastPage} />
      )}
    </Box>
  );
};

const handledDate = (createdDate: string): string => {
  return createdDate.substring(0, 10);
};

const handleList = (list: ListDataArray): TypeDataArray | null => {
  if (list.length === 0) return null;
  if (isCommunityListArrayData(list)) {
    return list.map(({ id, title, content, createdDate, writer, range, category }) => {
      return {
        ID: id,
        title,
        content,
        type: range,
        category,
        writer: writer.name,
        date: handledDate(createdDate),
      };
    });
  }
  if (isNoticeListArrayData(list)) {
    return list.map(({ id, title, content, createdDate, writer, range }) => {
      return {
        ID: id,
        title,
        content,
        type: range,
        writer,
        date: handledDate(createdDate),
      };
    });
  }

  return list.map(({ id, title, content, createdDate, writer }) => {
    return {
      ID: id,
      title,
      content,
      date: handledDate(createdDate),
      writer: `${writer.lineName}동 ${writer.houseName}호`,
    };
  });
};

const buttonTextByType: Obj<string> = {
  complaint: '민원 작성',
  community: '글쓰기',
};

const mapStateToProps = (state: RootState) => {
  return {
    accountAccessToken: state.accessTokenReducer.accountAccessToken,
    isReadyForRequestAPI: state.readyForRequestAPIReducer,
  };
};

export default connect(mapStateToProps)(ListPage);
