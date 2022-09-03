import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import TableNav from '~/components/molecules/TableNav';
import Board from '~/components/organisms/Board';
import Comment from '~/components/organisms/Comment';
import PageHeader from '~/components/organisms/PageHeader';
import { useLocation } from 'react-router-dom';
import myAxios from '~/others/myAxios';
import {
  isDeliveredCommunityPostData,
  isDeliveredNoticePostData,
  DeliverdTypePostData,
  ProcessedTypePostData,
} from '~/others/integrateInterface';
import { APIbyType } from '~/others/integrateVariable';
import { connect } from 'react-redux';
import { RootState } from '~/others/store';

interface ViewPageProps {
  type: string;
  accountAccessToken: string;
}

const ViewPage = ({ type, accountAccessToken }: ViewPageProps) => {
  const [viewData, setViewData] = useState<DeliverdTypePostData | null>(null);
  const [boardData, setBoardData] = useState<ProcessedTypePostData | null>(null);
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
    const commonViewData = {
      id: viewData.id,
      title: viewData.title,
      content: viewData.content,
      date: viewData.createdDate,
    };
    if (isDeliveredNoticePostData(viewData)) {
      const { writer, range, expiredDate, releaseLine } = viewData;
      setBoardData({
        ...commonViewData,
        writer,
        type: range,
      });
      return;
    }

    if (isDeliveredCommunityPostData(viewData)) {
      const { writer, range, category, like } = viewData;
      setBoardData({
        ...commonViewData,
        writer: `${writer.lineName}동 ${writer.houseName}호 ${writer.name}`,
        type: range,
        category,
      });
      return;
    }

    const { writer } = viewData;
    setBoardData({
      ...commonViewData,
      writer: `${writer.lineName}동 ${writer.houseName}호`,
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
