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
import { ComplaintData, NoticeData, CommunityData, Obj } from '~/others/integrateInterface';

interface ListPageProps {
  type: string;
  accountAccessToken: string;
  isReadyForRequestAPI: boolean;
}

// rows type 관련 처리해야함.

const ListPage = ({ type, accountAccessToken, isReadyForRequestAPI }: ListPageProps) => {
  const location = useLocation();
  const [tableData, setTableData] = useState<{
    list: any[];
    isFirstPage: boolean;
    isLastPage: boolean;
  }>({
    list: [],
    isFirstPage: false,
    isLastPage: false,
  });
  const { list, isFirstPage, isLastPage } = tableData;
  const rows = handleList(list, type);

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
    console.log(res);
    setTableData(res.data.response);
  };

  useEffect(() => {
    if (!isReadyForRequestAPI) return;
    getListData();
  }, [isReadyForRequestAPI]);

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
        <PageHeader type={type} />
        {type === 'notice' || type === 'community' ? (
          <TableNav type={type} isPageMove={false} />
        ) : (
          <></>
        )}
        {type === 'complaint' || type === 'community' ? (
          <Box
            sx={{ width: '100%', display: 'flex', justifyContent: 'right', paddingRight: '20px' }}
          >
            <Button component={Link} to={`/${type}/writting`} variant='contained'>
              {buttonTextByType[type]}
            </Button>
          </Box>
        ) : (
          <></>
        )}
        <BoardTable type={type} rows={rows} isFirstPage={isFirstPage} isLastPage={isLastPage} />
      </Box>
    </>
  );
};

const handleList = (list: any[], type: string) => {
  return list.map(({ Id, title, category, range, writer, createdDate }) => {
    const common = {
      ID: Id,
      title,
    };
    switch (type) {
      case 'notice':
        return {
          ...common,
          type: range,
          date: createdDate,
          writer,
        };
      case 'complaint':
        return {
          ...common,
          date: createdDate,
          writer: `${writer.lineName}동 ${writer.houseName}호`,
        };
      case 'community':
        return {
          ...common,
          type: range,
          category,
          writer: writer.name,
        };
    }
  });
};

const APIbyType: Obj<string> = {
  notice: `api/v1/notices`,
  complaint: `api/v1/reports`,
  community: `api/v1/communities`,
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
