import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Table, TableBody, TableRow } from '@mui/material';
import { TableRowForComment } from '../molecules/TableRow';
import styled from 'styled-components';
import { CommentData, Obj } from '~/others/integrateInterface';
import { accessTokenState } from '~/others/store';
import { useLocation } from 'react-router-dom';
import myAxios from '~/others/myAxios';

const CommentForm: React.FC = () => {
  const handlePostComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const comment = data.get('comment')?.toString() ?? '';
    // const res = myAxios('post', `/api/v1/comments/`, body, undefined);
  };

  return (
    <Box
      component='form'
      onSubmit={handlePostComment}
      action='#'
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        marginBottom: '30px',
        '& .MuiTextField-root': {
          m: 1,
          width: 'calc(100% - 130px)',
        },
      }}
      autoComplete='off'
    >
      <TextField
        label='댓글 입력'
        name='comment'
        multiline
        maxRows={4}
        variant='standard'
        required
      />
      <Button sx={{ whiteSpace: 'nowrap', height: '40px' }} type='submit' variant='outlined'>
        댓글 달기
      </Button>
    </Box>
  );
};

interface CommentProps {
  accessToken: accessTokenState;
}

const Comment: React.FC<CommentProps> = ({
  accessToken: { accountAccessToken, profileAccessToken },
}) => {
  const location = useLocation();
  const [comments, setComments] = useState<CommentData[] | null>(null);

  const getComments = async (type: string, boardId: string) => {
    const res = await myAxios(
      'get',
      `${commentAPIbyType[type]}${boardId}?page=1&count=500`,
      null,
      true,
      accountAccessToken,
    );
    setComments(res.data.response.list);
  };

  useEffect(() => {
    const [pre, type, boardId] = location.pathname.split('/');
    getComments(type, boardId);
  }, []);
  return (
    <CommentContainer className='comment'>
      <CommentForm />
      <Table>
        <TableBody>
          {comments &&
            comments.map((comment, index) => {
              return (
                <TableRow key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <TableRowForComment commentData={comment} />
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </CommentContainer>
  );
};

const commentAPIbyType: Obj<string> = {
  notice: `api/v1/comments/notices/`,
  complaint: `api/v1/comments/reports/`,
  community: `api/v1/comments/communities/`,
};

const CommentContainer = styled.div`
  max-width: 1200px;
  width: 100%;
  height: 200px;
`;

export default Comment;
