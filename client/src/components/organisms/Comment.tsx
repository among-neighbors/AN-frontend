import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Table, TableBody, TableContainer, TableRow } from '@mui/material';
import { TableRowForComment } from '../molecules/TableRow';

const CommentForm = () => {
  const [value, setValue] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handlePost = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(value);
  };

  return (
    <Box
      component='form'
      onSubmit={handlePost}
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
      noValidate
      autoComplete='off'
    >
      <TextField
        label='댓글 입력'
        multiline
        maxRows={4}
        value={value}
        onChange={handleChange}
        variant='standard'
      />
      <Button sx={{ whiteSpace: 'nowrap', height: '40px' }} type='submit' variant='outlined'>
        댓글 달기
      </Button>
    </Box>
  );
};

interface Comment {
  writer: string;
  comment: string;
  date: string;
}

interface CommentsProp {
  comments: Comment[];
}

const Comments = ({ comments }: CommentsProp) => {
  React.useEffect(() => {}, []);

  return (
    <>
      <Table>
        <TableBody>
          {comments.map((comment, index) => {
            return (
              <TableRow key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
                <TableRowForComment comment={comment} />
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

const Comment = () => {
  return (
    <>
      <div className='comment'>
        <CommentForm />
        <Comments
          comments={[
            {
              writer: '홍길동',
              comment: '댓글입니당~',
              date: '2022.08.14',
            },
            {
              writer: '홍길동',
              comment: '댓글입니당하이댓글입니당하이댓글입니당하이',
              date: '2022.08.14',
            },
          ]}
        />
      </div>
      <style jsx>{`
        .comment {
          max-width: 1200px;
          width: 100%;
          height: 200px;
        }
      `}</style>
    </>
  );
};

export default Comment;
