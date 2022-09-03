import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import TableNav from '~/components/molecules/TableNav';
import Board from '~/components/organisms/Board';
import Comment from '~/components/organisms/Comment';
import PageHeader from '~/components/organisms/PageHeader';
import { useLocation } from 'react-router-dom';
import myAxios from '~/others/myAxios';
import {
  isCommunityListData,
  isNoticeListData,
  ListData,
  TypeData,
} from '~/others/integrateInterface';
import { APIbyType } from '~/others/integrateVariable';
import { connect } from 'react-redux';
import { RootState } from '~/others/store';

interface ViewPageProps {
  type: string;
  accountAccessToken: string;
}

const ViewPage = ({ type, accountAccessToken }: ViewPageProps) => {
  const [viewData, setViewData] = useState<ListData | null>(null);
  const [boardData, setBoardData] = useState<TypeData | null>(null);
  const location = useLocation();

  const getViewData = async (id: string) => {
    const res = await myAxios('get', `${APIbyType[type]}/${id}`, null, true, accountAccessToken);
    setViewData(res.data.response);
  };

  useEffect(() => {
    const [pre, type, id] = location.pathname.split('/');
    getViewData(id);
    console.log(pre, type, id);
  }, []);

  useEffect(() => {
    if (!viewData) return;
    if (isNoticeListData(viewData)) {
      const { id, title, content, createdDate, writer, range, expiredDate, releaseLine } = viewData;
      setBoardData({
        ID: id,
        title,
        content,
        writer,
        date: createdDate,
        type: range,
      });
      return;
    }

    if (isCommunityListData(viewData)) {
      const { id, title, content, createdDate, writer, range, category, like } = viewData;
      setBoardData({
        ID: id,
        title,
        content,
        writer: `${writer.lineName}동 ${writer.houseName}호 ${writer.name}`,
        date: createdDate,
        type: range,
        category,
      });
      return;
    }

    const { id, title, content, createdDate, writer } = viewData;
    setBoardData({
      ID: id,
      title,
      content,
      writer: `${writer.lineName}동 ${writer.houseName}호`,
      date: createdDate,
    });
  }, [viewData]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <PageHeader type={type} />
      {type === 'community' || type === 'notice' ? <TableNav type={type} /> : <></>}
      {boardData && <Board type={type} boardData={boardData} />}
      {type === 'community' || type === 'complaint' ? <Comment /> : <></>}
    </Box>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    accountAccessToken: state.accessTokenReducer.accountAccessToken,
  };
};

export default connect(mapStateToProps)(ViewPage);
