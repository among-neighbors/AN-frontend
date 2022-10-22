import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import {
  isProcessedCommunityPostData,
  isProcessedNoticePostData,
  ProcessedTypePostData,
} from '~/others/integrateInterface';
import { stringByScope, stringByCategory, handledDate } from '~/others/integrateVariable';
import { ReactComponent as Heart } from '../../../public/img/heart.svg';
import { ReactComponent as EmptyHeart } from '../../../public/img/heartEmpty.svg';
import BoardNav from '../molecules/BoardNav';
import myAxios from '~/others/myAxios';
import { accessTokenState } from '~/others/store';

interface BoardProps {
  boardData: ProcessedTypePostData;
  type: string;
  writerId: number;
  accessToken: accessTokenState;
}

const Board: React.FC<BoardProps> = ({ boardData, type, writerId, accessToken }) => {
  const [likeData, setLikeData] = useState({
    count: 0,
    didILiked: false,
  });
  const getExpression = async () => {
    const res = await myAxios(
      'get',
      `api/v1/expressions/${boardData.id}`,
      undefined,
      undefined,
      accessToken.profileAccessToken,
    );
    setLikeData(res.data.response);
  };

  const sendExpression = async () => {
    const res = await myAxios(
      'post',
      `api/v1/expressions`,
      {
        communityId: boardData.id,
      },
      undefined,
      accessToken.profileAccessToken,
    );
    getExpression();
  };

  useEffect(() => {
    getExpression();
  }, []);

  return (
    <Box sx={{ maxWidth: '1200px', width: '100%' }}>
      <Box
        className='boardHeader'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          minHeight: '80px',
          borderTop: 'solid #666 3px',
        }}
      >
        <Typography variant='h5' sx={{ padding: '11px 10px', height: '50px' }}>
          {boardData.title}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            maxWidth: '600px',
            padding: '0 12px',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            '& p': {
              color: '#666',
              fontSize: '14px',
              whiteSpace: 'nowrap',
              marginBottom: '3px',
            },
          }}
        >
          {boardData.scope && <p>{`유형 : ${stringByScope[boardData.scope]}`}</p>}
          {boardData.category && <p>{`카테고리 : ${stringByCategory[boardData.category]}`}</p>}
          <p>{`작성자 : ${boardData.writer}`}</p>
          <p>{`등록일 : ${handledDate(boardData.date)}`}</p>
        </Box>
      </Box>
      <Box
        className='textBox'
        sx={{
          border: 'solid #d9d9d9',
          minHeight: '350px',
          borderWidth: '1.5px 0',
          padding: '30px 10px 50px 10px',
          marginBottom: '5px',
        }}
      >
        {boardData.content.split('\n').map((str, index) => {
          return (
            <Typography
              key={index}
              sx={{
                lineHeight: '24px',
                marginBottom: '9px',
                whiteSpace: 'pre-wrap',
              }}
            >
              {str}
            </Typography>
          );
        })}
        {likeData.didILiked ? (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'absolute',
              bottom: '20px',
              left: 'calc(50% - 30px)',
              width: '80px',
              height: '80px',
              borderRadius: '6px',
              border: '2px solid#f6be9a',
              cursor: 'pointer',
              padding: '11px',
              '& svg': {
                width: '30px',
                height: '30px',
              },
              ':hover': {
                background: '#f6be9a73',
              },
              '& p': {
                fontWeight: '700',
                fontSize: '14px',
              },
            }}
            onClick={sendExpression}
          >
            <Heart />
            <p>{likeData.count}</p>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'absolute',
              bottom: '20px',
              left: 'calc(50% - 30px)',
              width: '80px',
              height: '80px',
              borderRadius: '6px',
              border: '2px solid #ddd',
              cursor: 'pointer',
              padding: '11px',
              '& svg': {
                width: '30px',
                height: '30px',
              },
              ':hover': {
                background: '#eee',
                border: '2px solid #ccc',
              },
              '& p': {
                fontWeight: '700',
                fontSize: '14px',
              },
            }}
            onClick={sendExpression}
          >
            <EmptyHeart />
            <p>{likeData.count}</p>
          </Box>
        )}
      </Box>
      {isProcessedCommunityPostData(boardData) || isProcessedNoticePostData(boardData) ? (
        <BoardNav type={type} boardId={boardData.id} writerId={writerId} />
      ) : (
        <BoardNav type={type} writerId={writerId} />
      )}
    </Box>
  );
};

export default Board;
