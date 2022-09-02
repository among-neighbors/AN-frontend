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

interface Data {
  ID: string;
  title: string;
  type: boolean;
  writer: string;
  date: string;
}

interface ListPageProps {
  type: string;
  accountAccessToken: string;
  isReadyForRequestAPI: boolean;
}

interface stringObj {
  [key: string]: string;
}

const ListPage = ({ type, accountAccessToken, isReadyForRequestAPI }: ListPageProps) => {
  const [ListData, setListData] = useState([]);

  const getListData = async () => {
    const res = await myAxios('get', `${APIbyType[type]}`, null, true, accountAccessToken);
    setListData(res.data.response.communityList);
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
        <BoardTable type={type} rows={rows} />
      </Box>
    </>
  );
};

const APIbyType: stringObj = {
  notice: `api/v1/notices`,
  complaint: `api/v1/reports`,
  community: `api/v1/communities?page=1&count=10&range=ALL&category=ALL`,
};

const buttonTextByType: stringObj = {
  complaint: '민원 작성',
  community: '글쓰기',
};

function createData(ID: string, title: string, type: boolean, writer: string, date: string): Data {
  return { ID, title, type, writer, date };
}

const rows = [
  createData('0', '해윙', true, '홍길동', '2022.08.14'),
  createData('1', '안녕하세요 제목입니다.', true, '홍길동', '2022.08.14'),
  createData('2', '안녕하세요 제목입니다.', true, '홍길동', '2022.08.14'),
  createData('3', '안녕하세요 제목입니다.', true, '홍길동', '2022.08.14'),
  createData('3033', '안녕하세요 제목입니다.', true, '홍길동', '2022.08.14'),
  createData('3033', '안녕하세요 제목입니다.', true, '홍길동', '2022.08.14'),
  createData('3033', '안녕하세요 제목입니다.', true, '홍길동', '2022.08.14'),
  createData('3033', '안녕하세요 제목입니다.', true, '홍길동', '2022.08.14'),
  createData('3033', '안녕하세요 제목입니다.', true, '홍길동', '2022.08.14'),
  createData('3033', '안녕하세요 제목입니다.', true, '홍길동', '2022.08.14'),
  createData('3033', '안녕하세요 제목입니다.', true, '홍길동', '2022.08.14'),
  createData('3033', '안녕하세요 제목입니다.', true, '홍길동', '2022.08.14'),
  createData('3033', '안녕하세요 제목입니다.', true, '홍길동', '2022.08.14'),
  createData('3033', '안녕하세요 제목입니다.', true, '홍길동', '2022.08.14'),
  createData('3033', '안녕하세요 제목입니다.', true, '홍길동', '2022.08.14'),
  createData('3033', '안녕하세요 제목입니다.', true, '홍길동', '2022.08.14'),
  createData('3033', '안녕하세요 제목입니다.', true, '홍길동', '2022.08.14'),
  createData('3033', '안녕하세요 제목입니다.', true, '홍길동', '2022.08.14'),
  createData('3033', '안녕하세요 제목입니다.', true, '홍길동', '2022.08.14'),
  createData('3033', '안녕하세요 제목입니다.', true, '홍길동', '2022.08.14'),
];

const mapStateToProps = (state: RootState) => {
  return {
    accountAccessToken: state.accessTokenReducer.accountAccessToken,
    isReadyForRequestAPI: state.readyForRequestAPIReducer,
  };
};

export default connect(mapStateToProps)(ListPage);
